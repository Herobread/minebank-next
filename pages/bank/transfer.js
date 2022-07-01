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
import Subtext from "@/components/UI/Subtext";
import VerticalList from "@/components/UI/VerticalList";
import { useAuth } from "@/context/AuthContext";
import { formVerifiers } from "@/lib/configs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Transfer() {
    const list = [
        {
            name: 'Username',
            isHighlighted: true,
            to: '/profile'
        },
        {
            name: 'Bank',
            isHighlighted: false,
            to: '/bank'
        },
        {
            name: 'Business',
            isHighlighted: false,
            to: '/business'
        },
        {
            name: 'Shop',
            isHighlighted: false,
            to: '/shop'
        },
        {
            name: 'Orders',
            isHighlighted: false,
            to: '/orders'
        }
    ]

    const { control, formState: { errors }, handleSubmit } = useForm()
    const router = useRouter()
    const { transfer, user, userData } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleClick = () => {
        router.push('/bank')
    }

    const onSubmit = async ({ username, amount, comment }) => {
        setError('')
        setIsLoading(true)
        console.log('loading')
        await transfer({
            senderUid: user.uid,
            recipient: username,
            recipientUid: null,
            amount: amount,
            comment: comment
        })
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err)
                setError('err')
            })
            .finally(() => {
                console.log('not loading')
                console.log(error)
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
                    <VerticalList list={list} />
                </div>
                <div>
                    <Margin height={'20px'} />
                    <Header
                        subheader='your balance'
                        cta={<Button onClick={handleClick}>History</Button>}>
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

                        <Subtext type='error'>{error ? error : ''}</Subtext>
                        <Margin height='5px' />
                        <FlexRow flexDirection={'row-reverse'}>
                            <Button type='submit' disabled={isLoading}>Transfer</Button>
                        </FlexRow>
                    </form>
                </div>
            </Layout>
        </ContentWrapper>
    </div>
}
