import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': `url('/pan.png')`
      },
      screens: {
        xs: '400px'
      },
      colors: {
        primary: '#539dfd', // 添加自定义颜色
        'black-a': '#232931',
        'black-b': '#2c333e'
      },
      transitionDuration: {
        DEFAULT: '300ms' // 添加默认过渡时间为0.3秒
      },
      animation: {
        cycle: 'cycle infinite 10s linear'
      },
      animationPlayState: {
        paused: 'paused',
        running: 'running'
      },
      keyframes: {
        cycle: {
          '0%': { transform: 'rotate(0)' },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      }
    }
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      dark: {
        colors: {
          background: "#232931",
        },
      },
    }
  })]
};
export default config;
