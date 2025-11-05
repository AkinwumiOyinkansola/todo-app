export const theme = {
  colors: {
    light: {
      background: '#FFFFFF',
      surface: '#F9FAFB',
      text: '#1F2937',
      textSecondary: '#6B7280',
      primary: '#A855F7',
      primaryLight: '#E9D5FF',
      error: '#EF4444',
      border: '#E5E7EB',
    },
    dark: {
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      primary: '#A855F7',
      primaryLight: '#E9D5FF',
      error: '#F87171',
      border: '#374151',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    title: '24px',
    body: '16px',
    caption: '14px',
  },
  borderRadius: 8,
  shadow: {
    light: '0 1px 3px rgba(0,0,0,0.1)',
    dark: '0 1px 3px rgba(0,0,0,0.3)',
  },
} as const;

export default theme;