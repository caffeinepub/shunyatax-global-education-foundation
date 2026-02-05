import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                gradient: {
                    start: 'oklch(var(--gradient-start))',
                    mid: 'oklch(var(--gradient-mid))',
                    end: 'oklch(var(--gradient-end))'
                },
                pastel: {
                    mint: 'oklch(var(--pastel-mint))',
                    peach: 'oklch(var(--pastel-peach))',
                    yellow: 'oklch(var(--pastel-yellow))',
                    rose: 'oklch(var(--pastel-rose))',
                    ivory: 'oklch(var(--pastel-ivory))',
                    powder: 'oklch(var(--pastel-powder))'
                },
                section: {
                    bg: 'oklch(var(--section-bg))',
                    'bg-alt': 'oklch(var(--section-bg-alt))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                glow: '0 0 25px oklch(var(--primary) / 0.2)',
                'glow-lg': '0 0 35px oklch(var(--primary) / 0.25)',
                'accent-glow': '0 0 30px oklch(var(--accent) / 0.25)',
                'pastel-glow': '0 0 20px oklch(var(--pastel-mint) / 0.2)',
                'turquoise-glow': '0 0 25px oklch(var(--primary) / 0.22)',
                'peach-glow': '0 0 25px oklch(var(--accent) / 0.22)',
                'powder-glow': '0 0 20px oklch(var(--secondary) / 0.2)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' }
                },
                'slide-up': {
                    from: { transform: 'translateY(20px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-down': {
                    from: { transform: 'translateY(-20px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' }
                },
                'scale-in': {
                    from: { transform: 'scale(0.95)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' }
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 25px oklch(var(--primary) / 0.2)' },
                    '50%': { boxShadow: '0 0 35px oklch(var(--primary) / 0.3)' }
                },
                'pulse-glow-slow': {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.05)' }
                },
                'pulse-glow-fast': {
                    '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.08)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.6s ease-out',
                'slide-up': 'slide-up 0.6s ease-out',
                'slide-down': 'slide-down 0.6s ease-out',
                'scale-in': 'scale-in 0.5s ease-out',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                float: 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'pulse-glow-slow': 'pulse-glow-slow 3s ease-in-out infinite',
                'pulse-glow-fast': 'pulse-glow-fast 1.5s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};

