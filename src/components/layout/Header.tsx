import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { MagneticWrapper } from '../ui/MagneticWrapper'
import { clsx } from 'clsx'

const NAV_ITEMS = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.about, label: 'About' },
  { to: ROUTES.contact, label: 'Contact' },
]

export function Header() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-slate-800/50">
      <nav className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link to={ROUTES.home} className="text-lg font-bold text-indigo-400" aria-label="CodeExplainer home">
          CodeExplainer
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6" role="list">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.to}
              to={item.to}
              role="listitem"
              className={clsx(
                'text-sm transition-colors',
                pathname === item.to
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              )}
              aria-current={pathname === item.to ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <MagneticWrapper strength={0.2}>
            <Link
              to={ROUTES.home}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/25"
              aria-label="Explain code"
            >
              Explain Code
            </Link>
          </MagneticWrapper>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800/50 bg-[#0a0a0f] px-4 py-4 space-y-4">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={clsx(
                'block text-base transition-colors',
                pathname === item.to
                  ? 'text-white font-medium'
                  : 'text-slate-400 hover:text-white'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={ROUTES.home}
            className="block w-full text-center px-4 py-3 bg-indigo-600 text-white text-base rounded-lg hover:bg-indigo-500 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Explain Code
          </Link>
        </div>
      )}
    </header>
  )
}
