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
import { navList } from "@/lib/configs";
import Header from "@/components/UI/Header";
import SplitPanel from "@/components/UI/SplitPanel";
import Center from "@/components/skeleton/Center";
import WideCardWithOptions from "@/components/UI/WideCardWithOptions";
import BigFont from "@/components/tools/BigFont";
import Mc from "@/components/UI/Mc";
import FlexRow from "@/components/skeleton/FlexRow";
import { useRouter } from "next/router";
import { useState } from "react";
import AddProductModal from "@/components/Modals/AddProductModal";
import GenerateUserProducts from "@/components/tools/GenerateUserProducts";
import GenerateBusinessOrders from "@/components/tools/GenerateBusinessOrders";

export default function Business() {
    const { userData, user } = useAuth()
    const router = useRouter()

    const [isEditProductModalOpened, setIsEditProductModalOpened] = useState(false)
    const [profit, setProfit] = useState(0)
    const [soldAmount, setSoldAmount] = useState(0)

    const handleRedirectManage = () => {
        router.push('/business/manage')
    }

    const handleEditProductModalOpen = () => {
        setIsEditProductModalOpened(true)
    }

    const handleEditProductModalClose = () => {
        setIsEditProductModalOpened(false)
    }

    const businessDataCallback = (profit, soldAmount) => {
        setSoldAmount(soldAmount)
        setProfit(profit)
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
                <motion.div key={'Business'} {...fadeAnimations}>
                    <Margin height={'20px'} />
                    <Header
                        cta={<Button onClick={handleRedirectManage}>Orders</Button>}
                        subheader={'Dashboard'}>Business</Header>
                    <Margin height={'20px'} />
                    <SplitPanel>
                        <Center isHorizontal={true}>
                            <BigFont>
                                +{profit} <Mc>Mc</Mc>
                            </BigFont>
                        </Center>
                        <Center isHorizontal={true}>
                            <BigFont>
                                {soldAmount} <Mc>sold</Mc>
                            </BigFont>
                        </Center>
                    </SplitPanel>
                    <Margin height={'10px'} />


                    <GenerateBusinessOrders callback={businessDataCallback} />


                    <Margin height={'10px'} />
                    <Subtext>Your products</Subtext>
                    <Margin height={'10px'} />



                    <GenerateUserProducts data={userData} user={user} />



                    <FlexRow flexDirection={'row-reverse'}>
                        <Button onClick={handleEditProductModalOpen}>Add new</Button>
                    </FlexRow>
                </motion.div>
            </Layout>



            <AddProductModal isOpen={isEditProductModalOpened} onClose={handleEditProductModalClose} />
        </ContentWrapper >
    </div >
}