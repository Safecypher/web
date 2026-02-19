import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, fullWidth = false, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={['form-control', fullWidth ? 'w-full' : ''].filter(Boolean).join(' ')}>
        {label && (
          <label className="label" htmlFor={inputId}>
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'input input-bordered',
            error ? 'input-error' : '',
            fullWidth ? 'w-full' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {(error ?? helpText) && (
          <label className="label">
            <span className={`label-text-alt ${error ? 'text-error' : 'text-base-content/60'}`}>
              {error ?? helpText}
            </span>
          </label>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
