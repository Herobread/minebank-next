import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Margin from "@/components/skeleton/Margin";
import GenerateTransactionList from "@/components/tools/GenerateTransactionList";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Mc from "@/components/UI/Mc";
import Navbar from "@/components/UI/Navbar";
import VerticalList from "@/components/UI/VerticalList";
import WideSelect from "@/components/UI/WideSelect";
import { useAuth } from "@/context/AuthContext";
import { fadeAnimations } from "@/lib/animations";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from 'framer-motion'
import TagSelect from "@/components/UI/TagSelect";


export default function Bank() {
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

    const selectOptions = [
        {
            name: 'All',
            value: 'all'
        },
        {
            name: 'Shop',
            value: 'shop'
        },
        {
            name: 'Transfers',
            value: 'transfer'
        },
        {
            name: 'In',
            value: 'in'
        },
        {
            name: 'Out',
            value: 'out'
        },
    ]

    const [filter, setFilter] = useState('all')

    const router = useRouter()
    const { userData } = useAuth()

    const changeFilter = (filter) => {
        setFilter(filter)
    }

    const handleClick = () => {
        router.push('/bank/transfer')
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
                <motion.div {...fadeAnimations}>
                    <Margin height={'20px'} />

                    <Header
                        subheader='your balance'
                        cta={<Button onClick={handleClick}>Transfer</Button>}>
                        {userData?.minecoins} <Mc>Mc</Mc>
                    </Header>
                    <Margin height={'20px'} />

                    <TagSelect options={selectOptions} selectedAtStart={'all'} callback={changeFilter} />

                    <GenerateTransactionList data={userData?.transactions} sort={filter} />
                </motion.div>
            </Layout>
        </ContentWrapper>
    </div>
}
