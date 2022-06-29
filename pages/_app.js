import { AuthContextProvider } from '@/context/AuthContext'
import { DataContextProvider } from '@/context/dataContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
    <DataContextProvider>
      <Component {...pageProps} />
    </DataContextProvider>
  </AuthContextProvider>
}

export default MyApp
