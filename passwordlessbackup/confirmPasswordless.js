import { useAuth } from "@/context/AuthContext"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { useRouter } from "next/router"

export default function ConfirmPasswordLess() {
	const { auth } = useAuth()
	const { router } = useRouter()

	console.log('Verifying...')

	if (isSignInWithEmailLink(auth, window.location.href)) {
		let email = window.localStorage.getItem('emailForSignIn')

		console.log(email)
		if (!email) {
			email = window.prompt('Please provide your email for confirmation')
		}
		signInWithEmailLink(auth, email, window.location.href)
			.then((result) => {
				window.localStorage.removeItem('emailForSignIn')

				router.push('/bank')
				console.log(result)
			})
			.catch((error) => {
				console.log(error.code)
			})
	}
}
