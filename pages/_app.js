import { AuthContextProvider } from '@/context/AuthContext'
import '../styles/globals.css'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Head from 'next/head';

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {

	return <AuthContextProvider>
		<Head>
			<title>Minebank</title>
		</Head>
		<AnimateSharedLayout>
			<Component {...pageProps} />
		</AnimateSharedLayout>
	</AuthContextProvider>
}

export default MyApp
