import { tailwindConfig } from '@magi-ui/system'

import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@magi-ui/core/dist/**/*.{cjs,mjs}',
    './node_modules/@magi-ui/headless/dist/components/**/*.{cjs,mjs}'
  ],
  presets: [tailwindConfig],
  theme: {
    extend: {
      fontFamily: {
        kaku: ['var(--font-ZenKakuGothicNew)'],
        mincho: ['var(--font-ZenOldMincho)'],
        mono: ['var(--font-mono)'],
        pointer: ['var(--font-pointer)']
      },
      transitionDuration: {
        DEFAULT: '0.3s'
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        fadeOut: {
          '0%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0'
          }
        },
        fadeInFromBottom: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-16px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(-0px)'
          }
        },
        fadeOutToBottom: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0px)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-16px)'
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(.35,0,.37,1.05) forwards',
        'fade-out':
          'fadeOut 0.3s cubic-bezier(.35,0,.37,1.05) forwards',
        'fade-in-from-b':
          'fadeInFromBottom 0.3s cubic-bezier(.35,0,.37,1.05) forwards',
        'fade-out-to-b':
          'fadeOutToBottom 0.3s cubic-bezier(.35,0,.37,1.05) forwards'
      }
    }
  }
} satisfies Config

export default config
