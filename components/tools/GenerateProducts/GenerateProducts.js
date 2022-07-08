import ShopGrid from '@/components/skeleton/ShopGrid'
import ProductCard from '@/components/UI/shop/ProductCard'
import { useAuth } from '@/context/AuthContext'
import s from './GenerateProducts.module.css'

export default function GenerateProducts() {
    const { shopData } = useAuth()

    let res = []

    shopData?.forEach(item => {
        res.push(<div>
            <ProductCard data={item} />
        </div>)
    })

    return <ShopGrid>
        {res}
    </ShopGrid>
}
