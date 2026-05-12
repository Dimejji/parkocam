import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },

  theme: {
    defaultTheme: 'dark',   // change to 'light' if you want white by default

    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#00d4ff',
          secondary: '#ff4081',
          background: '#0a0a0a',
          surface: '#121212',
        }
      },

      light: {                    // ← Add this for white theme
        dark: false,
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          background: '#FFFFFF',
          surface: '#F5F5F5',
        }
      },

      parking: {
        dark: true,
        colors: {
          primary: '#22c55e',
          background: '#020617',
          surface: '#1e2937',
        }
      }
    }
  }
})