'use client'

import React, { useState, useRef } from 'react'
import { RatioSeekBarProps } from './type'

export const RatioSeekBar = ({
  value,
  onChange
}: RatioSeekBarProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const barRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isDragging) {
      updateValue(event.clientX)
    }
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && event.touches && event.touches[0]) {
      updateValue(event.touches[0].clientX)
    }
  }

  const updateValue = (clientX: number) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect()
      const offsetX = clientX - rect.left
      const newValue = Math.min(
        100,
        Math.max(0, Math.ceil((offsetX / rect.width) * 100))
      )
      onChange(newValue)
    }
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div
      className="mg-w-1/2 mg-mx-auto mg-text-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={barRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="mg-w-full mg-h-2 mg-bg-gray-300 mg-relative mg-cursor-pointer"
      >
        <div
          className="mg-h-full mg-bg-blue-500 mg-absolute mg-top-0"
          style={{ width: `${value}%` }}
        ></div>
        <div
          className="mg-absolute mg-top-[-5px] mg-w-2.5 mg-h-5 mg-bg-blue-500 mg-transform mg--translate-x-1/2 mg-cursor-pointer"
          style={{ left: `${value}%` }}
        ></div>
      </div>
      <div>Value: {Math.round(value)}</div>
    </div>
  )
}
