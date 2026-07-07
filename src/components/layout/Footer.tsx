export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} CodeExplainer. All rights reserved.
        </p>
        <p className="text-sm text-slate-500">
          Powered by Grok API &amp; Three.js
        </p>
      </div>
    </footer>
  )
}
