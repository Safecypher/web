'use client'

import { useState, useRef } from 'react'

interface InputSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  prefix?: string
  format?: (v: number) => string
  onChange: (v: number) => void
  tooltip?: string
}

export function InputSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  prefix,
  format,
  onChange,
  tooltip,
}: InputSliderProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const displayValue = format ? format(value) : `${prefix ?? ''}${value.toLocaleString('en')}${unit ?? ''}`

  const startEditing = () => {
    setEditing(true)
    setEditValue(String(value))
    setTimeout(() => inputRef.current?.select(), 0)
  }

  const commitEdit = () => {
    const parsed = parseFloat(editValue)
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed))
      onChange(clamped)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <div className="space-y-1">
      {/* Label row */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-base-content/80">{label}</span>
        {tooltip && (
          <div className="tooltip tooltip-right" data-tip={tooltip}>
            <span className="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-base-300 text-base-content/60 cursor-help">
              ?
            </span>
          </div>
        )}
      </div>

      {/* Slider + value display row */}
      <div className="flex items-center gap-3">
        <input
          type="range"
          className="range range-primary range-sm flex-1"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <div className="min-w-[6rem] text-right">
          {editing ? (
            <input
              ref={inputRef}
              type="number"
              className="input input-xs input-bordered w-24 text-right"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <button
              onClick={startEditing}
              className="text-sm font-mono text-primary hover:text-primary/80 transition-colors cursor-text underline decoration-dotted"
              title="Click to edit"
            >
              {displayValue}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
