import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-slate-800/50 py-6 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} CodeExplainer
          </p>
          <p className="text-xs text-slate-600">
            Powered by Groq Cloud &middot; Three.js &middot; React
          </p>
        </div>
      </footer>
    </div>
  )
}
