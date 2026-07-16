import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SEOHead } from '../components/seo/SEOHead'
import { TechLogosScene } from '../components/three/TechLogosScene'
import { MagneticWrapper } from '../components/ui/MagneticWrapper'
import { explainCode, type ExplainResponse } from '../services/api'
import { MAX_CODE_LINES, MAX_CODE_CHARS } from '../utils/constants'

const fadeIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

const languageExtensions: Record<string, ReturnType<typeof javascript>> = {
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  python: python(),
  html: html(),
  css: css(),
  json: json(),
  markdown: markdown(),
  md: markdown(),
}

function getLanguageExt(language: string) {
  const key = language.toLowerCase().trim()
  return languageExtensions[key] || javascript()
}

export function Home() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('')
  const [explaining, setExplaining] = useState(false)
  const [result, setResult] = useState<ExplainResponse | null>(null)
  const [error, setError] = useState('')

  const lineCount = code.split(/\r\n|\r|\n/).filter(l => l.length > 0).length
  const charCount = code.length

  const isOverLimit = lineCount > MAX_CODE_LINES || charCount > MAX_CODE_CHARS
  const canSubmit = code.trim().length > 0 && !isOverLimit && !explaining

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setResult(null)

    setExplaining(true)
    try {
      const res = await explainCode({ code, language: language || undefined })
      setResult(res)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Explanation service is temporarily unavailable.'
      setError(msg)
    } finally {
      setExplaining(false)
    }
  }

  function onChange(value: string) {
    setCode(value)
    const lines = value.split(/\r\n|\r|\n/).length
    if (lines > MAX_CODE_LINES) {
      setError(`Code exceeds the maximum limit of ${MAX_CODE_LINES} lines (${lines} lines).`)
    } else {
      setError('')
    }
  }

  return (
    <>
      <SEOHead
        title="AI Code Explainer & Reviewer"
        description="Codex is a free code explainer. Paste any code to explain code online with our AI code explanation tool and code to natural language AI."
        path="/"
      />
      <div className="min-h-screen">
      <div className="relative w-full h-[500px]">
        <div className="absolute inset-0">
          <TechLogosScene isActive={explaining} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/60 to-[#0a0a0f]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10">
        <motion.div {...fadeIn}>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
              Codex: Free AI Code Explainer
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Explain code online instantly. Paste your code below and let our code to natural language AI act as your personal AI code reviewer.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-slate-500 ml-2 font-mono">code-input</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={lineCount > MAX_CODE_LINES ? 'text-red-400' : 'text-slate-500'}>
                    {lineCount}/{MAX_CODE_LINES} lines
                  </span>
                  <span className={charCount > MAX_CODE_CHARS ? 'text-red-400' : 'text-slate-500'}>
                    {charCount}/{MAX_CODE_CHARS} chars
                  </span>
                </div>
              </div>
              <CodeMirror
                value={code}
                onChange={onChange}
                height="240px"
                theme={oneDark}
                extensions={[getLanguageExt(language)]}
                placeholder="Paste your code here..."
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: true,
                  autocompletion: false,
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <input
                type="text"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="flex-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50"
                placeholder="Language (javascript, python, html, css...)"
              />
              <MagneticWrapper strength={0.2}>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="px-8 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/25"
                >
                  {explaining ? 'Explaining...' : 'Explain'}
                </button>
              </MagneticWrapper>
            </div>
          </form>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              {...fadeIn}
              className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-6"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              {...fadeIn}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50">
                <span className="text-xs font-mono text-slate-400">explanation-output</span>
                <span className="text-xs text-slate-600">
                  {result.tokensUsed} tokens
                </span>
              </div>
              <div className="p-4 text-sm text-slate-300 leading-relaxed font-sans prose prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-cyan-300 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700/50">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {result.explanation}
                </ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: 'Step-by-Step', desc: 'Detailed breakdown of every line and block.' },
            { title: 'Architecture-First', desc: 'High-level overview before diving deep.' },
            { title: 'Optimization Tips', desc: 'Complexity analysis and improvement suggestions.' },
          ].map(item => (
            <div key={item.title} className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5 text-center">
              <h3 className="text-slate-200 font-semibold mb-1">{item.title}</h3>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="mt-20 mb-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-200">What Developers Say</h2>
            <p className="text-slate-400 mt-2">Join thousands of developers using our AI code explanation tool.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-6">
              <p className="text-slate-300 text-sm italic mb-4">"This free code explainer has completely transformed how I review pull requests. As an AI code reviewer, it catches complexities I often miss and explains them in plain English. The code to natural language AI is incredibly accurate."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold">JD</div>
                <div>
                  <h4 className="text-slate-200 text-sm font-semibold">James D.</h4>
                  <p className="text-slate-500 text-xs">Senior Frontend Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-6">
              <p className="text-slate-300 text-sm italic mb-4">"Whenever I'm stuck trying to understand an undocumented legacy codebase, I use Codex to explain code online. It's simply the best AI code explanation generator out there—saving me hours of debugging time every week."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">SA</div>
                <div>
                  <h4 className="text-slate-200 text-sm font-semibold">Sarah A.</h4>
                  <p className="text-slate-500 text-xs">Backend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}
