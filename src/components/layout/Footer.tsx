import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} CodeExplainer. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="flex items-center gap-4">
          <Link to={ROUTES.home} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
          <Link to={ROUTES.about} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">About</Link>
          <Link to={ROUTES.contact} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Contact</Link>
        </nav>
        <p className="text-sm text-slate-500">
          Powered by Groq API &amp; Three.js
        </p>
      </div>
    </footer>
  )
}
