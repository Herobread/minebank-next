import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import s from './WideCardWithOptions.module.css'

// import { tick } from '@/icons/tick.svg'

export default function WideCard({ img, title, description, info, buttons }) {
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
        <div className={s.button} >
            {buttons}
        </div>
    </div>
}
