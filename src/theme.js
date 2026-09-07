import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#6366f1', // Indigo
            light: '#818cf8',
            dark: '#4f46e5',
          },
          secondary: {
            main: '#ec4899', // Pink
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#0f172a',
            secondary: '#64748b',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#818cf8',
            light: '#a5b4fc',
            dark: '#6366f1',
          },
          secondary: {
            main: '#f472b6',
          },
          background: {
            default: '#0f172a', // Slate 900
            paper: '#1e293b',   // Slate 800
          },
          text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
          backgroundImage: 'none', // Remove default MUI dark mode gradient
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
          boxShadow: 'none',
          color: mode === 'dark' ? '#f8fafc' : '#0f172a',
        },
      },
    },
  },
});

export const getTheme = (mode) => createTheme(getDesignTokens(mode));
