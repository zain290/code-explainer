import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div {...fadeIn}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          About Code Explainer
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
          An AI-powered tool that helps developers understand code faster with clear, structured explanations.
        </p>
      </motion.div>

      <motion.div {...fadeIn} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} className="space-y-4 mb-12">
        <p className="text-slate-300 leading-relaxed">
          Code Explainer uses the Groq Cloud API with fast LLMs like Llama 3.3 70B to analyze
          your code and produce structured, architectural explanations.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Every explanation includes a high-level overview, a line-by-line breakdown, and an
          optimization or complexity analysis — giving you a complete understanding of the code.
        </p>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          'Powered by Groq Cloud (llama-3.3-70b-versatile)',
          'Supports any programming language',
          'Max 100 lines and 6,000 characters per request',
          'Rate-limited to 10 requests per minute',
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
  )
}
