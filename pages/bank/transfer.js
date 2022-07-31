import ContentWrapper from "@/components/skeleton/ContentWrapper";
import FlexRow from "@/components/skeleton/FlexRow";
import Layout from "@/components/skeleton/Layout";
import Margin from "@/components/skeleton/Margin";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Input from "@/components/UI/Input";
import Mc from "@/components/UI/Mc";
import Navbar from "@/components/UI/Navbar";
import PanelSelect from "@/components/UI/PanelSelect";
import Subtext from "@/components/UI/Subtext";
import VerticalList from "@/components/UI/VerticalList";
import { useAuth } from "@/context/AuthContext";
import { formVerifiers, navList } from "@/lib/configs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { motion } from 'framer-motion'
import { fadeAnimations } from "@/lib/animations";
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton";
import Cross from '@/icons/cross.svg'

export default function Transfer() {
    const { control, formState: { errors }, handleSubmit, setValue } = useForm()
    const router = useRouter()
    const { transfer, user, userData } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const [success, setSuccess] = useState('')

    const handleReturn = () => {
        router.push('/bank')
    }

    const panelCallback = (user) => {
        setSelectedUser(user)
        setValue('username', user, { shouldValidate: true })
    }

    const onSubmit = async ({ username, amount, comment }) => {
        setError('')
        setSuccess('')

        setIsLoading(true)

        const tempAmount = amount
        const tempUsername = username

        await transfer({
            senderUid: user.uid,
            recipient: username,
            recipientUid: null,
            amount: amount,
            comment: comment
        })
            .then(() => {
                setSuccess(`Successfully transfered ${tempAmount} Mc to ${tempUsername}`)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

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
                        subheader='your balance'
                        cta={<OptionButton onClick={handleReturn} img={<Cross />} />}>
                        {userData?.minecoins} <Mc>Mc</Mc>
                    </Header>
                    <Margin height={'20px'} />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            defaultValue=''
                            name='username'
                            control={control}
                            rules={formVerifiers.username}
                            render={({ field }) => <Input label={'Recipient nickname'} {...field} />}
                        />
                        <Margin height='5px' />
                        <Subtext type='error'>{errors.username && errors.username?.message}</Subtext>
                        <Margin height='5px' />

                        {/* <Subtext>Or select one from previous transfers</Subtext> */}
                        {/* <Margin height={'10px'} /> */}
                        <PanelSelect callback={panelCallback} selected={selectedUser} data={userData?.recent} />

                        <Controller
                            defaultValue=''
                            name='amount'
                            control={control}
                            rules={formVerifiers.amount}
                            render={({ field }) => <Input label={'Amount'} {...field} />}
                        />
                        <Margin height='5px' />
                        <Subtext type='error'>{errors.amount && errors.amount?.message}</Subtext>
                        <Margin height='5px' />


                        <Controller
                            defaultValue=''
                            name='comment'
                            control={control}
                            rules={formVerifiers.comment}
                            render={({ field }) => <Input label={'Comment'} value='' {...field} />}
                        />
                        <Margin height='5px' />
                        <Subtext type='error'>{errors.comment && errors.comment?.message}</Subtext>
                        <Margin height='5px' />

                        <Subtext type='error'>{error && error}</Subtext>
                        <Subtext timeout={5000} changeContent={setSuccess} type='ok'>{success && success}</Subtext>

                        <Margin height='5px' />
                        <FlexRow flexDirection={'row-reverse'}>
                            <Button type='submit' disabled={isLoading}>Transfer</Button>
                        </FlexRow>
                    </form>
                </motion.div>
            </Layout>
        </ContentWrapper>
    </div>
}
