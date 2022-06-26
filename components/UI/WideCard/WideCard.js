import Image from 'next/image'
import s from './WideCard.module.css'

export default function WideCard({ img, title, description, info, amount }) {
    return <div className={s.container}>
        <div className={s.img}>

        </div>
        <div className={s.title}>
            {title}
        </div>
        <div className={s.description}>
            {description}
        </div>
        <div className={s.info}>
            {info}
        </div>
        <div className={s.amount}>
            <span>{amount}<span className='mc'> Mc</span></span>
        </div>
    </div>
}
