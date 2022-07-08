import EditProductModal from "@/components/Modals/EditProductModal"
import Margin from "@/components/skeleton/Margin"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import Subtext from "@/components/UI/Subtext"
import WideCardWithOptions from "@/components/UI/WideCardWithOptions"
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import Edit from '@/icons/edit.svg'

export default function GenerateUserProducts({ user, data }) {
    console.log(data)
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

    if (filtered == null) {
        return <Subtext>No products found</Subtext>
    }

    filtered.forEach((item, i) => {
        const { product } = item

        res.push(<div key={i}>
            <WideCardWithOptions
                title={product.name}
                description={product.price}
                info={'NaN sold'}
                img={<ProfilePicture name={product.name} src={product.img} />}
                buttons={<OptionButton onClick={() => { handleProductModalOpen(i) }} img={<Edit />} />}
            />
            <Margin height={'10px'} />
        </div>)
    })

    console.log()
    const handleProductModalOpen = (id) => {
        setProductModalData(filtered[id])
        setIsProductModalOpened(true)
    }

    const handleProductModalClose = () => {
        setIsProductModalOpened(false)
    }

    console.log(productModalData)
    return <div>
        {res}
        <EditProductModal data={productModalData} isOpen={isProductModalOpened} onClose={handleProductModalClose} />
    </div>
}
