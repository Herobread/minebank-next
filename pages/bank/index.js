import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Margin from "@/components/skeleton/Margin";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Mc from "@/components/UI/Mc";
import Navbar from "@/components/UI/Navbar";
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture";
import Subtext from "@/components/UI/Subtext";
import VerticalList from "@/components/UI/VerticalList";
import WideCard from "@/components/UI/WideCard";
import WideSelect from "@/components/UI/WideSelect";
import { useData } from "@/context/DataContext";
import { useState } from "react";

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
            value: 'transfers'
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
    const changeFilter = (filter) => {
        setFilter(filter)
    }

    const { userData } = useData()

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
                        cta={<Button>Transfer</Button>}>
                        100 <Mc>Mc</Mc>
                    </Header>
                    <Margin height={'20px'} />

                    <WideSelect options={selectOptions} selectedAtStart={'all'} callback={changeFilter} />
                    <Margin height={'20px'} />

                    {JSON.stringify(userData)}

                    <Subtext>26 June</Subtext>
                    <Margin height={'5px'} />
                    sort: {filter}
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' img={<ProfilePicture name={'a'} src={''} />} />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' img={<ProfilePicture name='asd' src={'https://i.picsum.photos/id/569/200/200.jpg?hmac=rzX0dRJRyZs2NIa_h_87CJVeoetRLtTlweCZmYrYlCA'} />} />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />

                    <Subtext>26 June</Subtext>
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                    <WideCard title='title' description='desc' info='12:34' amount='10' />
                    <Margin height={'10px'} />
                </div>
            </Layout>
        </ContentWrapper>
    </div>
}
