import { motion } from 'framer-motion'
import { SEOHead } from '../components/seo/SEOHead'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function About() {
  return (
    <>
      <SEOHead
        title="About"
        description="Learn about Codex — an AI-powered tool that helps developers understand code faster with clear, structured explanations."
        path="/about"
      />
      <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div {...fadeIn}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          About Codex
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
          An AI-powered tool that helps developers understand code faster with clear, structured explanations.
        </p>
      </motion.div>

      <motion.div {...fadeIn} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} className="space-y-4 mb-12">
        <p className="text-slate-300 leading-relaxed">
          Codex is built on a high-performance AI engine that processes and analyzes code in real time.
          It uses advanced language models trained specifically for software understanding — delivering
          architectural insights that go beyond simple syntax explanations.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Every explanation includes a high-level overview, a line-by-line breakdown, and an
          optimization or complexity analysis — giving you a complete understanding of the code.
        </p>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="space-y-4 mb-12"
      >
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Paste Your Code', desc: 'Drop any code snippet — JavaScript, Python, TypeScript, HTML, CSS, or more.' },
            { title: 'AI Analysis Engine', desc: 'Our AI model analyzes structure, logic, and patterns to build a comprehensive understanding.' },
            { title: 'Get Smart Insights', desc: 'Receive a clear step-by-step breakdown with optimization suggestions and complexity analysis.' },
          ].map(item => (
            <div key={item.title} className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-5">
              <h3 className="text-slate-200 font-semibold mb-2 text-sm">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          'Powered by high-end AI language models',
          'Supports any programming language',
          'Max 100 lines and 6,000 characters per request',
          'Rate-limited to ensure fair usage for everyone',
          'Interactive 3D visualizations',
          'Sleek, modern dark-themed interface',
        ].map(feature => (
          <div key={feature} className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
            <span className="text-sm text-slate-300">{feature}</span>
          </div>
        ))}
      </motion.div>
    </div>
    </>
  )
}
