import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-sm text-slate-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} Codex. All rights reserved.
        </p>
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          <Link to={ROUTES.home} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
          <Link to={ROUTES.about} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">About</Link>
          <Link to={ROUTES.contact} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Contact</Link>
          <Link to={ROUTES.privacyPolicy} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link to={ROUTES.terms} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  )
}
