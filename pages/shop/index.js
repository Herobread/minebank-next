import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import Margin from "@/components/skeleton/Margin";
import VerticalList from "@/components/UI/VerticalList";
import { fadeAnimations } from "@/lib/animations";
import { navList } from "@/lib/configs";
import Header from "@/components/UI/Header";
import Mc from "@/components/UI/Mc";
import WideCard from "@/components/UI/WideCard";


export default function Shop() {
    const { userData, shopData } = useAuth()

    const availableProductsAmount = shopData?.length

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
                    <Header subheader={`${availableProductsAmount} products are available`}>Shop</Header>
                    <Margin height={'20px'} />


                    s


                    <Subtext>Want to sell your own products? <Link href='/business'><a>Add product in &apos;business&apos; page</a></Link></Subtext>
                </motion.div>
            </Layout>
        </ContentWrapper >
    </div >
}