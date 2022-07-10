import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Margin from "@/components/skeleton/Margin";
import Protected from "@/components/tools/Protected";
import Header from "@/components/UI/Header";
import Navbar from "@/components/UI/Navbar";
import VerticalList from "@/components/UI/VerticalList";
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton";
import { fadeAnimations } from "@/lib/animations";
import { navList } from "@/lib/configs";

import { motion } from 'framer-motion'

import Cross from '@/icons/cross.svg'
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import WideProductCard from "@/components/UI/shop/WideProductCard";
import SubHeader from "@/components/UI/SubHeader";
import Subtext from "@/components/UI/Subtext";
import Text from "@/components/UI/Text";
import FlexRow from "@/components/skeleton/FlexRow";
import Button from "@/components/UI/Button";
import WideCard from "@/components/UI/WideCard";
import WideCardWithOptions from "@/components/UI/WideCardWithOptions";
import Center from "@/components/skeleton/Center";

export default function ViewItem() {
    const router = useRouter()
    const { shopData, findProduct } = useAuth()

    const { id } = router.query

    const handleReturn = () => {
        router.push('/shop')
    }

    const item = findProduct(id)

    if (item == null) {
        return <Subtext>Item not found</Subtext>
    }

    const { product, authorUsername } = item
    const { name, img, price, sold, inStock, description } = product

    const description_ = description ? description : 'No description provided'

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
                        subheader={'Product info'}
                        cta={<OptionButton onClick={handleReturn} img={<Cross />} />}
                    >{name}</Header>
                    <Margin height={'20px'} />
                    <WideProductCard data={product} />

                    <Margin height={'10px'} />
                    <div>
                        <Center isHorizontal={true}>
                            <Subtext type={'ok'}>Order successfully created</Subtext>
                        </Center>
                    </div>
                    <Margin height={'10px'} />


                    <SubHeader>About this product</SubHeader>
                    <Margin height={'10px'} />
                    <Text>{description_}</Text>
                    <Margin height={'10px'} />
                    <Text>{`${inStock} in stock, ${sold} sold`}</Text>
                    <Margin height={'10px'} />
                    <Text>{`Published by ${authorUsername}`}</Text>

                    <Margin height={'20px'} />
                    <SubHeader>Your review</SubHeader>
                    <Margin height={'10px'} />
                    <Text>Want to share your opinion about this product? Press a button below to add a new review</Text>
                    <Margin height={'10px'} />
                    <FlexRow flexDirection={'row-reverse'}>
                        <Button>Add review</Button>
                    </FlexRow>

                    <Margin height={'20px'} />
                    <SubHeader>Reviews</SubHeader>
                    <Margin height={'10px'} />
                    <Text>No reviews yet</Text>

                </motion.div>
            </Layout>
        </ContentWrapper>
    </div >
}
