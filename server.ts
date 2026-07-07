import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

const app = express()
const PORT = Number(process.env.PORT) || 5201

app.use(cors({
  origin: [
    'http://localhost:5200',
    'http://localhost:4173',
    'https://zemz.pro',
  ],
  methods: ['POST', 'GET'],
}))

app.use(express.json({ limit: '1mb' }))

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'Too many requests. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', limiter)

app.post('/api/explain', async (req, res) => {
  try {
    const { code, language } = req.body

    if (!code || typeof code !== 'string') {
      res.status(400).json({ error: 'Code is required.' })
      return
    }

    const lineCount = code.split(/\r\n|\r|\n/).length
    if (lineCount > 50) {
      res.status(400).json({ error: 'Code exceeds the maximum limit of 50 lines.' })
      return
    }

    if (code.length > 3000) {
      res.status(400).json({ error: 'Code exceeds the maximum limit of 3,000 characters.' })
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

    res.json({ explanation, tokensUsed })
  } catch (error) {
    console.error('Server error:', error)
    res.status(503).json({ error: 'Explanation service is temporarily unavailable.' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
