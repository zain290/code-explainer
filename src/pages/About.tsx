import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEOHead } from '../components/seo/SEOHead'
import { ROUTES } from '../utils/constants'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function About() {
  return (
    <>
      <SEOHead
        title="About our AI Code Explainer Tool"
        description="Learn about Codex — an AI code explanation tool and code explanation generator that helps developers understand code faster with our code to natural language AI."
        path="/about"
      />
      <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div {...fadeIn}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          About Our AI Code Explainer
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl">
          An advanced AI-powered tool that acts as your personal AI code reviewer, helping developers understand code faster with clear, structured explanations.
        </p>
      </motion.div>

      <motion.div {...fadeIn} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }} className="space-y-4 mb-12">
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">The Ultimate Code Explanation Generator</h2>
        <p className="text-slate-300 leading-relaxed">
          Codex is built on a high-performance AI engine that processes and analyzes code in real time.
          It uses advanced language models specifically trained for software understanding to act as a code to natural language AI — delivering
          architectural insights that go far beyond simple syntax explanations. Whether you are debugging, reviewing PRs, or learning a new language, our AI code explanation tool is designed to accelerate your workflow.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Every explanation includes a high-level overview, a line-by-line breakdown, and an
          optimization or complexity analysis. This makes it the perfect free code explainer for anyone looking to explain code online quickly and accurately.
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

      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-semibold text-slate-200 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is this AI code explanation tool free?', a: 'Yes, Codex offers a free code explainer tier for developers to understand snippets quickly.' },
            { q: 'How does the code to natural language AI work?', a: 'Our engine uses state-of-the-art LLMs trained on vast amounts of code to act as an AI code reviewer, breaking down complex logic into easily understandable text.' },
            { q: 'Can I use it to explain code online in any language?', a: 'Codex supports almost all popular programming languages including JavaScript, Python, TypeScript, HTML, CSS, C++, and more.' },
            { q: 'Is my code kept private?', a: 'We do not store the code you paste for explanations. It is only processed in real-time to generate your answer.' },
          ].map((faq, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-6">
              <h3 className="text-slate-200 font-medium mb-2">{faq.q}</h3>
              <p className="text-slate-400 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
        className="mt-16 text-center bg-slate-900/60 border border-slate-800/50 rounded-2xl p-10"
      >
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Ready to try our AI code reviewer?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Paste your code and let our code explanation generator break it down for you in seconds.
        </p>
        <Link
          to={ROUTES.home}
          className="inline-block px-8 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/25"
        >
          Try the Free Code Explainer
        </Link>
      </motion.div>
    </div>
    </>
  )
}
