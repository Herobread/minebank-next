import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import s from './WideCard.module.css'

export default function WideCard({ img, title, description, info, amount }) {
    const [isOpened, setisOpened] = useState(false)

    return <div className={s.container}>
        <div className={s.img} >
            {img}
        </div>
        <div className={s.title}>
            {title}
        </div>
        <div className={s.description} >
            {description}
        </div>
        <div className={s.info} >
            {info}
        </div>
        <div className={s.amount} >
            <span>{amount}<span className='mc'> Mc</span></span>
        </div>
    </div>
}
