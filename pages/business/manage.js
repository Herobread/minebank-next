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
import { useRouter } from "next/router";

export default function Shop() {
    const { userData } = useAuth()
    const router = useRouter()

    const handleRedirectBusiness = () => {
        router.push('/business')
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
                    <Header subheader={'Manage'}
                        cta={<Button onClick={handleRedirectBusiness}>Dashboard</Button>}
                    >Business</Header>
                    <Margin height={'20px'} />
                </motion.div>
            </Layout>
        </ContentWrapper >
    </div >
}