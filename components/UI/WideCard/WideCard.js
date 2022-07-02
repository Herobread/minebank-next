import Image from 'next/image'
import Link from 'next/link'
import s from './WideCard.module.css'

export default function WideCard({ img, title, description, info, amount, id }) {
    return <Link href={{
        pathname: `/bank`,
        query: { id: id }
    }}>
        <div className={s.container}>
            <div className={s.img}>
                {img}
            </div>
            <div className={s.title}>
                {title}
            </div>
            <p className={s.description}>
                {description}
            </p>
            <div className={s.info}>
                {info}
            </div>
            <div className={s.amount}>
                <span>{amount}<span className='mc'> Mc</span></span>
            </div>
        </div>
    </Link>
}
