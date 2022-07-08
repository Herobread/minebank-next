import cn from 'common/cn'
import Mc from '../../Mc'
import s from './ProductCard.module.css'

export default function ProductCard({ data }) {
    console.log(data)

    const { name, price, img } = data.product
    // authorUid: "F6Zy5tqIQcNL0Ggl34cll48Jcb53"
    // authorUsername: "asd"
    // product: { price: 2, name: '12', img: '3', created: 1657295564773, sold: 0, … }
    return <div className={s.container} onClick={() => { alert('tut tipa product info') }}>
        <div className={cn([s.name, s.item])}>
            {name}
        </div>
        <div className={cn([s.imgContainer, s.item])}>
            <img src={img} className={s.img} />
        </div>
        <div className={cn([s.price, s.item])}>
            <pre>{price}<Mc> Mc</Mc></pre>
        </div>
    </div>
}
