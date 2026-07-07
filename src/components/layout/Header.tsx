import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { MagneticWrapper } from '../ui/MagneticWrapper'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-slate-800/50">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to={ROUTES.home} className="text-lg font-bold text-indigo-400">
          CodeExplainer
        </Link>
        <div className="flex items-center gap-6">
          <Link to={ROUTES.home} className="text-sm text-slate-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link to={ROUTES.about} className="text-sm text-slate-400 hover:text-white transition-colors">
            About
          </Link>
          <Link to={ROUTES.contact} className="text-sm text-slate-400 hover:text-white transition-colors">
            Contact
          </Link>
          <MagneticWrapper strength={0.2}>
            <Link
              to={ROUTES.home}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/25"
            >
              Explain Code
            </Link>
          </MagneticWrapper>
        </div>
      </nav>
    </header>
  )
}
