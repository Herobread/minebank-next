import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
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
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture";
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton";

import Tick from '@/icons/tick.svg'
import Cross from '@/icons/cross.svg'
import Clock from '@/icons/clock.svg'
import Edit from '@/icons/edit.svg'
import FlexRow from "@/components/skeleton/FlexRow";
import { useRouter } from "next/router";
import Modal from "@/components/UI/Modal";
import { useState } from "react";
import Input from "@/components/UI/Input";
import Split from "@/components/skeleton/Split";
import TextArea from "@/components/UI/TextArea";
import EditProductModal from "@/components/Modals/EditProductModal";
import AddProductModal from "@/components/Modals/AddProductModal";

export default function Business() {
    // const { userData } = useAuth()
    const router = useRouter()

    const [isProductModalOpened, setIsProductModalOpened] = useState(false)
    const [isEditProductModalOpened, setIsEditProductModalOpened] = useState(false)

    const handleRedirectManage = () => {
        router.push('/business/manage')
    }

    const handleProductModalOpen = () => {
        setIsProductModalOpened(true)
    }

    const handleProductModalClose = () => {
        setIsProductModalOpened(false)
    }

    const handleEditProductModalOpen = () => {
        setIsEditProductModalOpened(true)
    }

    const handleEditProductModalClose = () => {
        setIsEditProductModalOpened(false)
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
                <motion.div key={'Business'}{...fadeAnimations}>
                    <Margin height={'20px'} />
                    <Header
                        cta={<Button onClick={handleRedirectManage}>Manage</Button>}
                        subheader={'Dashboard'}>Business</Header>
                    <Margin height={'20px'} />
                    <SplitPanel>
                        <Center isHorizontal={true}>
                            <BigFont>
                                +100 <Mc>Mc</Mc>
                            </BigFont>
                        </Center>
                        <Center isHorizontal={true}>
                            <BigFont>
                                17 <Mc>sold</Mc>
                            </BigFont>
                        </Center>
                    </SplitPanel>
                    <Margin height={'10px'} />
                    <Subtext>New orders</Subtext>
                    <Margin height={'10px'} />

                    <WideCardWithOptions
                        title={'WhoOrdered'}
                        description={'Product, 10 Mc'}
                        info={'19:48, 06/07'}
                        img={<ProfilePicture name={'w'} />}
                        buttons={<>
                            <OptionButton img={<Tick />} />
                            <OptionButton img={<Clock />} />
                            <OptionButton img={<Cross />} />
                        </>}
                    />
                    <Margin height={'10px'} />
                    <WideCardWithOptions
                        title={'WhoOrdered'}
                        description={'Product, 10 Mc'}
                        info={'19:48, 06/07'}
                        img={<ProfilePicture name={'w'} />}
                        buttons={<>
                            <OptionButton img={<Tick />} />
                            <OptionButton img={<Clock />} />
                            <OptionButton img={<Cross />} />
                        </>}
                    />
                    <Margin height={'10px'} />
                    <WideCardWithOptions
                        title={'WhoOrdered'}
                        description={'Product, 10 Mc'}
                        info={'19:48, 06/07'}
                        img={<ProfilePicture name={'w'} />}
                        buttons={<>
                            <OptionButton img={<Tick />} />
                            <OptionButton img={<Clock />} />
                            <OptionButton img={<Cross />} />
                        </>}
                    />
                    <Margin height={'10px'} />
                    <FlexRow flexDirection={'row-reverse'}>
                        <Button>View all</Button>
                    </FlexRow>
                    <Margin height={'10px'} />
                    <Subtext>All products</Subtext>
                    <Margin height={'10px'} />
                    <WideCardWithOptions title={'Potato'}
                        description={'10 Mc'}
                        info={'10 sold'}
                        img={<ProfilePicture name={'p'} src={'https://i.ibb.co/xDcCYr4/Baked-Potato-JE4-BE2.png'} />}
                        buttons={<OptionButton onClick={handleProductModalOpen} img={<Edit />} />}
                    />
                    <Margin height={'10px'} />
                    <FlexRow flexDirection={'row-reverse'}>
                        <Button onClick={handleEditProductModalOpen}>Add new</Button>
                    </FlexRow>
                </motion.div>
            </Layout>


            <EditProductModal isOpen={isProductModalOpened} onClose={handleProductModalClose} />

            <AddProductModal isOpen={isEditProductModalOpened} onClose={handleEditProductModalClose} />
        </ContentWrapper >
    </div >
}