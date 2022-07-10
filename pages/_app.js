import { AuthContextProvider } from '@/context/AuthContext'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { AnimateSharedLayout } from 'framer-motion'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return <AuthContextProvider>
		<AnimateSharedLayout>
			<Component {...pageProps} />
		</AnimateSharedLayout>
	</AuthContextProvider>
}

export default MyApp
