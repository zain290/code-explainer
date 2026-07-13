import { motion } from 'framer-motion'
import { MagneticWrapper } from '../components/ui/MagneticWrapper'
import { SEOHead } from '../components/seo/SEOHead'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function Contact() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <SEOHead
        title="Contact"
        description="Get in touch with the CodeExplainer team. Questions, suggestions, or feedback? We'd love to hear from you."
        path="/contact"
      />
      <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.div {...fadeIn}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-slate-400 text-lg mb-12 max-w-xl">
          Questions, suggestions, or feedback? We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div {...fadeIn} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50"
            />
            <textarea
              rows={5}
              placeholder="Message"
              className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 resize-y"
            />
            <MagneticWrapper strength={0.2}>
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/25"
              >
                Send Message
              </button>
            </MagneticWrapper>
          </form>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-6 text-sm text-slate-400 leading-relaxed space-y-4"
        >
          <p>
            This project is built with React, Three.js, and the Groq Cloud API.
            The source code is available for review and contributions.
          </p>
          <p>
            For support inquiries, please describe the issue you&apos;re experiencing
            in as much detail as possible.
          </p>
        </motion.div>
      </div>
    </div>
    </>
  )
}
