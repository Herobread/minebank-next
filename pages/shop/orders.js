import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import { motion } from "framer-motion";
import Margin from "@/components/skeleton/Margin";
import VerticalList from "@/components/UI/VerticalList";
import { fadeAnimations } from "@/lib/animations";
import { navList } from "@/lib/configs";
import Header from "@/components/UI/Header";
import { useRouter } from "next/router";
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton";
import Cross from '@/icons/cross.svg'
import GeneratePersonalOrders from "@/components/tools/GeneratePersonalOrders";

export default function Orders() {
    const router = useRouter()

    const handleRedirectShop = () => {
        router.push('/shop')
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
                        // subheader={'From shop'}
                        cta={<OptionButton onClick={handleRedirectShop} img={<Cross />} />}
                    >Shop orders</Header>
                    <Margin height={'20px'} />
                    <GeneratePersonalOrders />
                </motion.div>
            </Layout>
        </ContentWrapper >
    </div >
}