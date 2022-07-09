import ShopGrid from '@/components/skeleton/ShopGrid'
import ProductCard from '@/components/UI/shop/ProductCard'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './GenerateProducts.module.css'

export default function GenerateProducts() {
    const { shopData } = useAuth()
    const router = useRouter()

    let res = []

    shopData?.forEach(item => {
        let id = item.product.created
        res.push(<ProductCard
            onClick={() => { handleOpen(id) }}
            data={item}
        />)
    })

    const handleOpen = (id) => {
        router.push(`/shop/${id}`)
    }

    return <ShopGrid>
        {res}
    </ShopGrid>
}
