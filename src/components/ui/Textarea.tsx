import { type TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
  fullWidth?: boolean
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, fullWidth = false, rows = 4, className = '', id, ...props }, ref) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <fieldset className={['fieldset', fullWidth ? 'w-full' : ''].filter(Boolean).join(' ')}>
        {label && (
          <legend className="fieldset-legend">{label}</legend>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={[
            'textarea',
            'w-full',
            error ? 'textarea-error' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {(error ?? helpText) && (
          <p className={`label text-sm ${error ? 'text-error' : 'text-base-content/60'}`}>
            {error ?? helpText}
          </p>
        )}
      </fieldset>
    )
  }
)

Textarea.displayName = 'Textarea'
