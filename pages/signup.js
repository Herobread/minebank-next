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
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const registerOptions = {
    username: {
        required: 'Username is required',
        pattern: {
            value: /^\S+$/,
            message: 'Username can not contain any spaces'
        }
    },
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

export default function Signup() {
    const { control, formState: { errors }, handleSubmit } = useForm()
    const { signup } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [serverErrors, setServerErrors] = useState('')

    const onSubmit = async (data) => {
        setIsLoading(true)
        await signup(data)
            .catch(error => { setServerErrors(error.message) })

        setIsLoading(false)
    }

    return <div>
        <Protected requiredUserType={null} redirect='/bank' />
        <FocusPanel>
            <Center>
                <Header>Welcome!</Header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Margin height='20px' />

                    {/* username */}
                    <Controller
                        defaultValue=''
                        name='username'
                        control={control}
                        rules={registerOptions.username}
                        render={({ field }) => <Input label={'Username'} {...field} />}
                    />
                    <Margin height='5px' />
                    <Subtext type='error'>{errors.username && errors.username?.message}</Subtext>
                    <Margin height='5px' />

                    {/* email */}
                    <Controller
                        defaultValue=''
                        name='email'
                        control={control}
                        rules={registerOptions.email}
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
                        rules={registerOptions.password}
                        render={({ field }) => <Input label={'Password'} type='password' {...field} />}
                    />
                    <Margin height='5px' />
                    <Subtext type='error'>{errors.password && errors.password?.message}</Subtext>
                    <Margin height='5px' />

                    <Subtext>Already have an account? <Link href='/login'><a>Log in</a></Link></Subtext>

                    <Margin height='5px' />
                    <Subtext type='error'>{serverErrors && serverErrors}</Subtext>

                    <Margin height='10px' />
                    <FlexRow flexDirection={'row-reverse'}>
                        <Button type='submit' disabled={isLoading}>Sign up</Button>
                    </FlexRow>
                </form>
            </Center>
        </FocusPanel>
    </div>
}
