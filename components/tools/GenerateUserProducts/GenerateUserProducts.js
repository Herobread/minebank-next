import EditProductModal from "@/components/Modals/EditProductModal"
import Margin from "@/components/skeleton/Margin"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import Subtext from "@/components/UI/Subtext"
import WideCardWithOptions from "@/components/UI/WideCardWithOptions"
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import Edit from '@/icons/edit.svg'
import Mc from "@/components/UI/Mc"
import Art from "@/components/UI/Art"
import BoxImg from '@/art/box.svg'
import Center from "@/components/skeleton/Center"
import Button from "@/components/UI/Button"
import FlexRow from "@/components/skeleton/FlexRow"

export default function GenerateUserProducts({ user, data, addNew }) {
    const { uid } = user
    const { shopData } = useAuth()

    const [isProductModalOpened, setIsProductModalOpened] = useState(false)
    const [productModalData, setProductModalData] = useState()

    let res = []

    const filtered = shopData?.filter(item => {
        if (item.authorUid === uid) {
            return item
        }
        return
    })

    console.log(filtered)

    if (!filtered || filtered.length === 0) {
        return <>
            <Art img={<BoxImg />}>
                <Subtext>You don`t have any products</Subtext>
                <Margin height={'10px'} />
                <Subtext>Add a product by pressing the button below</Subtext>
                <Margin height={'20px'} />
                <Center isHorizontal={true}>
                    <Button onClick={addNew}>Add new</Button>
                </Center>
            </Art>
        </>
    }

    filtered.forEach((item, i) => {
        const { product } = item

        res.push(<div key={i}>
            <WideCardWithOptions
                title={product.name}
                description={product.price + ' Mc'}
                info={`${product.sold} sold`}
                img={<ProfilePicture isSharp={true} name={product.name} src={product.img} />}
                buttons={<OptionButton onClick={() => { handleProductModalOpen(i) }} img={<Edit />} />}
            />
            <Margin height={'10px'} />
        </div>)
    })

    const handleProductModalOpen = (id) => {
        setProductModalData(filtered[id])

        setIsProductModalOpened(true)
    }

    const handleProductModalClose = () => {
        setIsProductModalOpened(false)
    }

    return <div>
        {res}
        <EditProductModal data={productModalData} isOpen={isProductModalOpened} onClose={handleProductModalClose} />
        <FlexRow flexDirection={'row-reverse'}>
            <Button onClick={addNew}>Add new</Button>
        </FlexRow>
    </div>
}
