import ShopGrid from '@/components/skeleton/ShopGrid'
import ProductCard from '@/components/UI/shop/ProductCard'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './GenerateProducts.module.css'
import Art from '@/components/UI/Art'
import BoxImg from '@/art/box.svg'
import Margin from '@/components/skeleton/Margin'
import Subtext from '@/components/UI/Subtext'
import Link from 'next/link'

export default function GenerateProducts() {
    const { shopData } = useAuth()
    const router = useRouter()

    if (!shopData || shopData.length === 0) {
        return <>
            <Art img={<BoxImg />}>
                <Subtext>No products found</Subtext>
                <Margin height={'10px'} />
                <Subtext>Add new product in <Link href='/business'><a>business page</a></Link></Subtext>
                <Margin height={'20px'} />
            </Art>
        </>
    }

    let res = []

    shopData?.forEach(item => {
        let id = item.product.created

        res.push(<ProductCard
            onClick={() => { handleOpen(id) }}
            data={item}
        />)
    })

    rex.push(<>
        <Margin height={'10px'} />
        <Subtext>Want to sell your own products? <Link href='/business'><a>Add product in business page</a></Link></Subtext>
    </>)

    const handleOpen = (id) => {
        router.push(`/shop/${id}`)
    }



    return <ShopGrid>
        {res}
    </ShopGrid>
}
