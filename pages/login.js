import Center from '@/components/skeleton/Center'
import FlexRow from '@/components/skeleton/FlexRow'
import FocusPanel from '@/components/skeleton/FocusPanel'
import Margin from '@/components/skeleton/Margin'
import Button from '@/components/UI/Button'
import Header from '@/components/UI/Header'
import Input from '@/components/UI/Input'
import Subtext from '@/components/UI/Subtext'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const loginOptions = {
	email: {
		required: 'Email is required',
		pattern: {
			value: /^(.+)@(.+)$/,
			message: 'Enter valid email'
		}
	},
	password: {
		required: 'Password is required',
		minLength: {
			value: 8,
			message: 'Password must have at least 8 characters'
		}
	}
}

export default function Login() {
	const { control, formState: { errors }, handleSubmit } = useForm()
	const { user, login } = useAuth()
	console.log(user)

	const [isLoading, setIsLoading] = useState(false)
	const [serverErrors, setServerErrors] = useState('')

	const onSubmit = async (data) => {
		setIsLoading(true)
		console.log(user)
		await login(data)

		setIsLoading(false)
	}

	return <div>
		<FocusPanel>
			<Center>
				<Header>Welcome back!</Header>
				<Margin height='20px' />

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* email */}
					<Controller
						defaultValue=''
						name='email'
						control={control}
						rules={loginOptions.email}
						render={({ field }) => <Input label={'Email'} {...field} />}
					/>
					<Margin height='5px' />
					<Subtext type='error'>{errors.email && errors.email?.message}</Subtext>
					<Margin height='5px' />

					{/* password */}
					<Controller
						defaultValue=''
						name='password'
						control={control}
						rules={loginOptions.password}
						render={({ field }) => <Input label={'Password'} type='password' {...field} />}
					/>
					<Margin height='5px' />
					<Subtext type='error'>{errors.password && errors.password?.message}</Subtext>
					<Margin height='5px' />

					<Subtext>Don`t have an account? <Link href='/signup'><a>Sign up</a></Link></Subtext>

					<Margin height='10px' />
					<FlexRow flexDirection={'row-reverse'}>
						<Button type='submit' disabled={isLoading}>Log in</Button>
					</FlexRow>
				</form>
			</Center>
		</FocusPanel>
	</div>
}
