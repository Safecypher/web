import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean
}

export function Card({ padding = true, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={['card bg-base-200', padding ? 'card-body' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

type CardBodyProps = HTMLAttributes<HTMLDivElement>

export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={['card-body', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}

type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

export function CardTitle({ className = '', children, ...props }: CardTitleProps) {
  return (
    <h2 className={['card-title', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </h2>
  )
}
