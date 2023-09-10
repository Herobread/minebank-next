import Center from '@/components/skeleton/Center'
import FlexRow from '@/components/skeleton/FlexRow'
import FocusPanel from '@/components/skeleton/FocusPanel'
import Margin from '@/components/skeleton/Margin'
import Protected from '@/components/tools/Protected'
import Button from '@/components/UI/Button'
import Header from '@/components/UI/Header'
import Input from '@/components/UI/Input'
import Subtext from '@/components/UI/Subtext'
import { useAuth } from '@/context/AuthContext'
import { formVerifiers } from '@/lib/configs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimationVertical } from '@/lib/animations'

export default function PasswordLess() {
	const { control, formState: { errors }, handleSubmit } = useForm()
	const { sendEmail } = useAuth()
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const [serverErrors, setServerErrors] = useState('')

	const destination = router.query?.from ? router.query.from : '/bank'

	const onSubmit = async (data) => {
		setIsLoading(true)

		let ok = true

		await sendEmail(data.email)
			.catch(error => {
				setServerErrors(error.message)
				ok = false
			})

		console.log(ok)
		
		// if (ok)
			// router.push(destination)

		setIsLoading(false)
	}

	return <div>
		<Protected requiredUserType={null} redirect={destination} />
		<FocusPanel>
			<Center>
				<AnimatePresence>
					<motion.div key={'login'} {...fadeAnimationVertical}>
						<Header>Welcome back!</Header>
						<Margin height='20px' />

						<form onSubmit={handleSubmit(onSubmit)}>
							{/* email */}
							<Controller
								defaultValue=''
								name='email'
								control={control}
								rules={formVerifiers.email}
								render={({ field }) => <Input label={'Email'} {...field} />}
							/>
							<Margin height='5px' />
							<Subtext type='error'>{errors.email && errors.email?.message}</Subtext>


							<Margin height='5px' />
							<Subtext type='error'>{serverErrors ? serverErrors : ''}</Subtext>

							<Margin height='5px' />
							<Center isHorizontal={true}>
								<Button type='submit' disabled={isLoading}>Send email</Button>
							</Center>
							<Margin height='10px' />

							<Center isHorizontal={true}>
								<Subtext>
									<Link href='/reset-password'><a>Forgot password</a></Link> &middot;
									<Link href='/signup'><a>Sign up</a></Link>
								</Subtext>
							</Center>
						</form>
					</motion.div>
				</AnimatePresence>
			</Center>
		</FocusPanel>
	</div>
}
