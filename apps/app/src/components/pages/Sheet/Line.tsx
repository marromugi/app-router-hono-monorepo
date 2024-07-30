'use client'

import clsx from 'clsx'
import React, { useState, useEffect } from 'react'

interface LineComponentProps {
  directions: ('down' | 'right' | 'left' | 'down-mini')[]
  radius: number
  color: string
}

const LineComponent: React.FC<LineComponentProps> = ({ directions, radius, color }) => {
  const [path, setPath] = useState('')
  const [svgWidth, setSvgWidth] = useState(window.innerWidth)
  const [svgHeight, setSvgHeight] = useState(0)
  const LINE_WIDTH = 16

  useEffect(() => {
    const handleResize = () => setSvgWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let currentX = svgWidth / 2
    let currentY = 0
    const barHeight = 96
    const horizontalUnit = svgWidth / 2 - 8 // 横方向の移動単位（画面幅の半分）
    let newPath = `M ${currentX} ${currentY}`
    let totalHeight = 10

    directions.forEach((dir, index) => {
      if (dir === 'down') {
        const isPrevDown = index > 0 && directions[index - 1] === 'down'
        currentY += isPrevDown ? barHeight : barHeight + LINE_WIDTH
        newPath += ` Q ${currentX} ${currentY - radius} ${currentX} ${currentY}`
        totalHeight = currentY
      } else if (dir === 'down-mini') {
        currentY += 32
        newPath += ` Q ${currentX} ${currentY - radius} ${currentX} ${currentY}`
        totalHeight = currentY
      } else if (dir === 'left') {
        currentX -= horizontalUnit
        newPath += ` Q ${currentX + radius} ${currentY} ${currentX} ${currentY}`
      } else if (dir === 'right') {
        currentX += horizontalUnit
        newPath += ` Q ${currentX - radius} ${currentY} ${currentX} ${currentY}`
      }
    })

    setPath(newPath)
    setSvgHeight(totalHeight + 10) // 10ピクセルのマージンを追加
  }, [directions, radius, svgWidth])

  return (
    <div className={clsx('mg-w-full mg-absolute')}>
      <svg
        width="100%"
        height={`${svgHeight}px`}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('mg-absolute')}
      >
        <path
          d={path}
          stroke={'#cccccc'}
          strokeWidth={LINE_WIDTH}
          fill="none"
          strokeLinejoin="round" // 角を丸くする
        />
      </svg>
      <svg
        width="100%"
        height={`${svgHeight}px`}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('mg-absolute')}
      >
        <path
          d={path}
          stroke={'#b3b3b3'}
          strokeWidth="6"
          fill="none"
          strokeLinejoin="round" // 角を丸くする
        />
      </svg>
    </div>
  )
}

export default LineComponent
