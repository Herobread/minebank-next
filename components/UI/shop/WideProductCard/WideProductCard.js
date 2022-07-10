import Margin from '@/components/skeleton/Margin'
import Button from '../../Button'
import Mc from '../../Mc'
import s from './WideProductCard.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { opacityAnimation } from '@/lib/animations'

export default function WideProductCard({ data, buy }) {
    const { name, img, price, created } = data

    return <div className={s.container}>
        <AnimatePresence>

            <motion.div className={s.imgContainer} layoutId={name + img} {...opacityAnimation}>
                <img src={img} layoutId={img} layout />
            </motion.div>
            <div className={s.contentContainer}>
                <motion.p className={s.name} layoutId={name + created}>{name}</motion.p>
                <motion.pre className={s.price} layoutId={name + price}>{price} <Mc>Mc</Mc></motion.pre>
                <Margin height={'7px'} />
                <Button onClick={buy}>Buy</Button>
            </div>
        </AnimatePresence>
    </div>
}
