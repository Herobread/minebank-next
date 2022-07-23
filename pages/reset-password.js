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
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimationVertical, scrollAnimation } from '@/lib/animations'

export default function Signup() {
    const { control, formState: { errors }, handleSubmit } = useForm()
    const { resetPassword } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [serverErrors, setServerErrors] = useState('')
    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        setIsLoading(true)
        setSuccess('')
        setServerErrors('')

        await resetPassword(data.email)
            .then(res => {
                setSuccess('Check your email to reset the password')
            })
            .catch(error => {
                setServerErrors(error.message)
            })

        setIsLoading(false)
    }

    return <div>
        <Protected requiredUserType={null} redirect='/bank' />
        <FocusPanel>
            <Center>
                <AnimatePresence>
                    <motion.div key={'signup'} {...fadeAnimationVertical}>
                        <Header>Reset password</Header>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Margin height='10px' />

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

                            <Margin height='5px' />
                            <Center isHorizontal={true}>
                                <Button type='wide' disabled={isLoading}>Send email</Button>
                            </Center>
                            <Margin height='10px' />

                            <Center isHorizontal={true}>
                                <Subtext>
                                    <Link href='/login'><a>Log in</a></Link> &middot; <Link href='/signup'><a>Sign up</a></Link>
                                </Subtext>
                            </Center>

                            <Margin height='10px' />

                            <Center isHorizontal={true}>
                                <Subtext type={'ok'}>
                                    {success && success}
                                </Subtext>
                            </Center>

                            <Center isHorizontal={true}>
                                <Subtext type='error'>{serverErrors && serverErrors}</Subtext>
                            </Center>

                            <Margin height='5px' />
                        </form>
                    </motion.div>
                </AnimatePresence>
            </Center>
        </FocusPanel>
    </div>
}
