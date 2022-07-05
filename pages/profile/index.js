import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Margin from "@/components/skeleton/Margin";
import VerticalList from "@/components/UI/VerticalList";
import { fadeAnimations } from "@/lib/animations";
import { formVerifiers, navList } from "@/lib/configs";
import Header from "@/components/UI/Header";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/UI/Input";
import { useEffect, useState } from "react";
import FlexRow from "@/components/skeleton/FlexRow";

export default function Profile() {
    const { control, formState: { errors }, handleSubmit, setValue } = useForm()
    const { logout, user, userData, updateUserData, getUserUid } = useAuth()

    const [isLoading, setisLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [success, setSuccess] = useState('')

    const handleClick = () => {
        logout()
    }

    const onSubmit = async (data) => {
        setisLoading(true)

        const usernameOwner = await getUserUid(data.username)

        const isAvailableName = !usernameOwner
        const isSameName = usernameOwner === user.uid

        if (isAvailableName || isSameName) {
            await updateUserData(user.uid, data)

            setServerError('')
            setSuccess('Data updated successfully')

            setisLoading(false)
            return
        } else {
            setServerError(`Username "${data.username}" is already taken`)

            setisLoading(false)
            return
        }
    }

    useEffect(() => {
        setValue('username', userData?.username)
        setValue('img', userData?.img)
        return () => { }
    }, [userData])


    return <div>
        <Protected requiredUserType={'user'} />
        <Navbar />
        <ContentWrapper>
            <Layout>
                <div>
                    <Margin height={'95px'} mobile={'0'} />
                    <VerticalList list={navList} />
                </div>
                <motion.div {...fadeAnimations}>
                    <Margin height={'20px'} />
                    <Header
                        subheader={'Your profile'}
                        cta={<Button onClick={handleClick}>Sign out</Button>}>{userData?.username}</Header>
                    <Margin height={'20px'} />


                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* username */}
                        <Controller
                            defaultValue=''
                            name='username'
                            control={control}
                            rules={formVerifiers.username}
                            render={({ field }) => <Input label={'Username'} {...field} />}
                        />
                        <Margin height='5px' />
                        <Subtext type='error'>{errors.username && errors.username?.message}</Subtext>
                        <Margin height='5px' />

                        {/* img */}
                        <Controller
                            defaultValue=''
                            name='img'
                            control={control}
                            rules={formVerifiers.url}
                            render={({ field }) => <Input label={'Profile image url'} {...field} />}
                        />
                        <Margin height='5px' />
                        <Subtext type='error'>{errors.img && errors.img?.message}</Subtext>
                        <Margin height='5px' />

                        <Subtext timeout={4000} type='ok'>{success && success}</Subtext>
                        <Subtext type='error'>{serverError && serverError}</Subtext>
                        <Margin height='5px' />

                        <FlexRow flexDirection={'row-reverse'}>
                            <Button type='submit' disabled={isLoading}>Save</Button>
                        </FlexRow>
                    </form>
                </motion.div>
            </Layout>
        </ContentWrapper >
    </div >
}