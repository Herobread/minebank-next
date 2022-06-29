import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Margin from "@/components/skeleton/Margin";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Mc from "@/components/UI/Mc";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import VerticalList from "@/components/UI/VerticalList";
import WideCard from "@/components/UI/WideCard";
import WideSelect from "@/components/UI/WideSelect";
import { useState } from "react";

export default function Bank() {
    const [list, setList] = useState([
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
    ])

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

    return <div>
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

                    <Subtext>26 June</Subtext>
                    <Margin height={'5px'} />
                    Cross component state 0_o: {filter}(sort is not working yet, because I don`t have any data)
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
