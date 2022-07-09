import ViewProductModal from '@/components/Modals/ViewProductModal'
import ShopGrid from '@/components/skeleton/ShopGrid'
import Button from '@/components/UI/Button'
import ProductCard from '@/components/UI/shop/ProductCard'
import { useAuth } from '@/context/AuthContext'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import s from './GenerateProducts.module.css'

export default function GenerateProducts() {
    const { shopData } = useAuth()
    const [isOpened, setIsOpened] = useState(false)

    let res = []

    shopData?.forEach((item, i) => {
        res.push(<div>
            <ProductCard
                onClick={() => { handleOpen(i) }}
                data={item}
            />
        </div>)
    })

    const handleClose = () => {
        setIsOpened(false)
    }

    const handleOpen = () => {
        setIsOpened(true)
    }

    return <ShopGrid>
        {res}
        <AnimatePresence>
            {
                isOpened &&
                <ViewProductModal isOpen={isOpened} onClose={handleClose} />
            }
        </AnimatePresence>
    </ShopGrid>
}
