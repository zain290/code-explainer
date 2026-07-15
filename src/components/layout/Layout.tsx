import { Outlet, Link } from 'react-router-dom'
import { Header } from './Header'
import { ROUTES } from '../../utils/constants'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-slate-800/50 py-6 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Codex. All rights reserved.
          </p>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <Link to={ROUTES.home} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
            <Link to={ROUTES.about} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">About</Link>
            <Link to={ROUTES.contact} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Contact</Link>
            <Link to={ROUTES.privacyPolicy} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to={ROUTES.terms} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
