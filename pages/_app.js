import { AuthContextProvider } from '@/context/AuthContext'
import '../styles/globals.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return <AuthContextProvider>
		<Component {...pageProps} />
	</AuthContextProvider>
}

export default MyApp
