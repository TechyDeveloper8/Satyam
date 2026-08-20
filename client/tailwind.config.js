/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aether: {
          bg: '#F4F4F2',
          surface: '#F7F7F5',
          card: '#FFFFFF',
          dark: '#111827',
          charcoal: '#1E293B',
          muted: '#64748B',
          subtle: '#94A3B8',
          border: '#E2E8F0',
          accent: '#0F172A',
          highlight: '#2563EB'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.08)',
        subtle: '0 2px 10px rgba(0, 0, 0, 0.03)'
      },
      backdropBlur: {
        glass: '16px',
        header: '12px'
      }
    }
  },
  plugins: []
};
