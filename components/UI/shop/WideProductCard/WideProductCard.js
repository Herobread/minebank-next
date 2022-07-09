import Margin from '@/components/skeleton/Margin'
import Button from '../../Button'
import Mc from '../../Mc'
import s from './WideProductCard.module.css'

export default function WideProductCard({ data, buy }) {
    const { name, img, price } = data

    return <div className={s.container}>
        <div className={s.imgContainer}>
            <img src={img} />
        </div>
        <div className={s.contentContainer}>
            <p className={s.name}>{name}</p>
            <p className={s.price}>{price} <Mc>Mc</Mc></p>
            <Margin height={'7px'} />
            <Button onClick={buy}>Buy</Button>
        </div>
    </div>
}
