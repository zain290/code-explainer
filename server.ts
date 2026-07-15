import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

const app = express()
const PORT = Number(process.env.PORT) || 5311
const SITE_URL = process.env.SITE_URL || 'https://codex.zemz.pro'
const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR) || 3

const SITEMAP_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
]

app.use(cors({
  origin: [
    'http://localhost:5200',
    'http://localhost:4173',
    'https://zemz.pro',
    'https://codex.zemz.pro',
  ],
  methods: ['POST', 'GET'],
}))

app.use(express.json({ limit: '1mb' }))

const burstLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const hourlyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_LIMIT_PER_HOUR,
  keyGenerator: (req) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const deviceId = req.headers['x-device-id'] as string | undefined
    return deviceId ? `${ip}|${deviceId}` : ip
  },
  message: { error: `Rate limit exceeded. ${RATE_LIMIT_PER_HOUR} explanations per hour allowed. Please try again later.` },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', burstLimiter)
app.use('/api/explain', hourlyLimiter)

app.post('/api/explain', async (req, res) => {
  try {
    const { code, language } = req.body

    if (!code || typeof code !== 'string') {
      res.status(400).json({ error: 'Code is required.' })
      return
    }

    const lineCount = code.split(/\r\n|\r|\n/).length
    if (lineCount > 100) {
      res.status(400).json({ error: 'Code exceeds the maximum limit of 100 lines.' })
      return
    }

    if (code.length > 6000) {
      res.status(400).json({ error: 'Code exceeds the maximum limit of 6,000 characters.' })
      return
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error('GROQ_API_KEY is not configured')
      res.status(503).json({ error: 'Explanation service is temporarily unavailable.' })
      return
    }

    const langHint = language ? `\nThe code is written in ${language}.` : ''
    const prompt = `Explain the following code step-by-step. Provide a high-level overview, followed by a markdown line-by-line breakdown, and end with an optimization or complexity analysis.${langHint}\n\n\`\`\`\n${code}\n\`\`\``

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an elite software architect. Explain the following code step-by-step. Provide a high-level overview, followed by a markdown line-by-line breakdown, and end with an optimization or complexity analysis.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: Number(process.env.GROQ_MAX_TOKENS) || 2000,
      }),
    })

    if (!groqRes.ok) {
      const errorText = await groqRes.text()
      console.error('Groq API error:', groqRes.status, errorText)
      res.status(503).json({ error: 'Explanation service is temporarily unavailable.' })
      return
    }

    const groqData = await groqRes.json() as {
      choices: Array<{ message: { content: string } }>
      usage?: { total_tokens: number }
    }

    const explanation = groqData.choices?.[0]?.message?.content
    const tokensUsed = groqData.usage?.total_tokens || 0

    if (!explanation) {
      res.status(503).json({ error: 'Explanation service is temporarily unavailable.' })
      return
    }

    res.json({ explanation, tokensUsed, remaining: req.rateLimit?.remaining ?? 0, limit: RATE_LIMIT_PER_HOUR })
  } catch (error) {
    console.error('Server error:', error)
    res.status(503).json({ error: 'Explanation service is temporarily unavailable.' })
  }
})

app.get('/sitemap.xml', (_req, res) => {
  const urls = SITEMAP_ROUTES.map(
    r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <priority>${r.priority.toFixed(1)}</priority>
    <changefreq>${r.changefreq}</changefreq>
  </url>`
  ).join('\n')

  res.header('Content-Type', 'application/xml')
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`)
})

app.get('/robots.txt', (_req, res) => {
  res.header('Content-Type', 'text/plain')
  res.send(`# Codex — robots.txt
# Updated: July 2026

User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
