import { AuthContextProvider } from '@/context/AuthContext'
import { AnimatePresence } from 'framer-motion'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  </AuthContextProvider>
}

export default MyApp
