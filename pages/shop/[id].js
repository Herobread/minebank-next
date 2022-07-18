import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Margin from "@/components/skeleton/Margin";
import Protected from "@/components/tools/Protected";
import Header from "@/components/UI/Header";
import Navbar from "@/components/UI/Navbar";
import VerticalList from "@/components/UI/VerticalList";
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton";
import { fadeAnimations, opacityAnimation } from "@/lib/animations";
import { navList } from "@/lib/configs";
import { motion } from 'framer-motion'
import Cross from '@/icons/cross.svg'
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import WideProductCard from "@/components/UI/shop/WideProductCard";
import SubHeader from "@/components/UI/SubHeader";
import Subtext from "@/components/UI/Subtext";
import Text from "@/components/UI/Text";
import FlexRow from "@/components/skeleton/FlexRow";
import Button from "@/components/UI/Button";
import WideCard from "@/components/UI/WideCard";
import WideCardWithOptions from "@/components/UI/WideCardWithOptions";
import Center from "@/components/skeleton/Center";
import AddReviewModal from "@/components/Modals/AddReviewModal";
import GenerateProductReviews from "@/components/tools/GenerateProductReviews";
import YourReview from "@/components/tools/YourReview";
import EditReviewModal from "@/components/Modals/EditReviewModal";

export default function ViewItem() {
    const router = useRouter()
    const { user, findProduct, orderProduct } = useAuth()
    const { id } = router.query

    const [isLoading, setIsLoading] = useState(false)
    const [isAddReviewOpened, setIsAddReviewOpened] = useState(false)
    const [isEditReviewOpened, setIsEditReviewOpened] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const item = findProduct(id)

    if (item == null) {
        return <Subtext>Item not found</Subtext>
    }

    const { product, authorUsername, reviews } = item
    const { name, sold, inStock, description, created } = product

    const description_ = description ? description : 'No description provided'

    const handleAddReviewClose = () => {
        setIsAddReviewOpened(false)
    }

    const handleAddReviewOpen = () => {
        setIsAddReviewOpened(true)
    }

    const handleEditReviewClose = () => {
        setIsEditReviewOpened(false)
    }

    const handleEditReviewOpen = () => {
        setIsEditReviewOpened(true)
    }

    const handleReturn = () => {
        router.push('/shop')
    }

    const handleBuy = async () => {
        setIsLoading(true)
        setSuccess('')
        setError('')

        await orderProduct({
            productId: created,
            buyerUid: user.uid
        })
            .then(res => setSuccess('Order successfully created'))
            .catch(err => setError(err))
            .finally(() => { setIsLoading(false) })
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
                        subheader={'Product info'}
                        cta={<OptionButton onClick={handleReturn} img={<Cross />} />}
                    >{name}</Header>
                    <Margin height={'20px'} />
                    <WideProductCard data={product} buy={handleBuy} isLoading={isLoading} />
                    <Margin height={'10px'} />
                    <div>
                        <Center isHorizontal={true}>
                            {success && <Subtext type={'ok'}>{success}</Subtext>}
                            {error && <Subtext type={'error'}>{error}</Subtext>}
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


                    <YourReview reviews={reviews} handleAddReviewOpen={handleAddReviewOpen} handleEditReviewOpen={handleEditReviewOpen} />

                    <Margin height={'20px'} />
                    <SubHeader>Reviews</SubHeader>

                    <Margin height={'10px'} />
                    <GenerateProductReviews reviews={reviews} />

                </motion.div>
            </Layout>

            <EditReviewModal isOpen={isEditReviewOpened} onClose={handleEditReviewClose} id={id} reviews={reviews} />
            <AddReviewModal isOpen={isAddReviewOpened} onClose={handleAddReviewClose} id={id} />
        </ContentWrapper>
    </div >
}
