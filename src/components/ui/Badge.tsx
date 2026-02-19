import { type HTMLAttributes } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline' | 'neutral'
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
}

const variantClass: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  ghost: 'badge-ghost',
  outline: 'badge-outline',
  neutral: 'badge-neutral',
}

const sizeClass: Record<BadgeSize, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
}

export function Badge({ variant = 'primary', size = 'md', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={['badge', variantClass[variant], sizeClass[size], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
