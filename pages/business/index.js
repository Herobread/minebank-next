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


export default function Business() {
    const { userData } = useAuth()

    return <div>
        <Protected requiredUserType={'user'} />
        <Navbar />
        <ContentWrapper>
            <Layout>
                <div>
                    <Margin height={'95px'} mobile={'0'} />
                    <VerticalList list={navList} />
                </div>
                <motion.div key={'Business'}{...fadeAnimations}>
                    <Margin height={'20px'} />
                    <Header
                        cta={<Button>Manage</Button>}
                        subheader={'Dashboard'}>Header</Header>
                    <Margin height={'20px'} />
                    <SplitPanel>
                        <Center isHorizontal={true}>asdad1</Center>
                        <Center isHorizontal={true}>asdad</Center>
                    </SplitPanel>
                    <Margin height={'10px'} />
                    <Subtext>New orders</Subtext>
                    <Margin height={'10px'} />
                    <WideCardWithOptions />
                </motion.div>
            </Layout>
        </ContentWrapper >
    </div >
}