import cn from 'common/cn'
import Mc from '../../Mc'
import s from './ProductCard.module.css'
import { motion } from 'framer-motion'
import { cardTranstion } from '@/lib/animations'

export default function ProductCard({ data, onClick }) {
    const { name, price, img } = data.product

    return <div className={s.container} onClick={onClick}>
        <div className={cn([s.name, s.item])}>
            <div className={s.name}>
                {name}
            </div>
        </div>

        <div layout className={cn([s.imgContainer, s.item])}>
            <img src={img} className={s.img} />
        </div>

        <div className={cn([s.price, s.item])}  >
            <pre>{price}<Mc> Mc</Mc></pre>
        </div>
    </div>
}
