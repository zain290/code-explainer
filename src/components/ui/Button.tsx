import type { ReactNode } from 'react'
import { MagneticWrapper } from './MagneticWrapper'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25',
  secondary: 'bg-pink-600 text-white hover:bg-pink-500 shadow-lg shadow-pink-600/25',
  ghost: 'bg-transparent text-slate-400 hover:text-white border border-slate-700/50',
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <MagneticWrapper strength={0.2}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className || ''}`}
      >
        {children}
      </button>
    </MagneticWrapper>
  )
}
