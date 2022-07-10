import cn from 'common/cn'
import Mc from '../../Mc'
import s from './ProductCard.module.css'
import { motion } from 'framer-motion'
import { cardTranstion } from '@/lib/animations'

export default function ProductCard({ data, onClick }) {
    const { name, price, img, created } = data.product
    // authorUid: "F6Zy5tqIQcNL0Ggl34cll48Jcb53"
    // authorUsername: "asd"
    // product: { price: 2, name: '12', img: '3', created: 1657295564773, sold: 0, … }
    return <motion.div className={s.container} onClick={onClick} layoutId={name + img}  {...cardTranstion}>
        <motion.div className={cn([s.name, s.item])} layoutId={name + created}  {...cardTranstion}>
            {name}
        </motion.div>

        <div layout className={cn([s.imgContainer, s.item])}>
            <img src={img} className={s.img} />
        </div>

        <motion.div layoutId={name + price} className={cn([s.price, s.item])}  {...cardTranstion}>
            <pre>{price}<Mc> Mc</Mc></pre>
        </motion.div>
    </motion.div>
}
