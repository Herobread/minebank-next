import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import s from './WideCard.module.css'

import { motion } from 'framer-motion'

export default function WideCard({ img, title, description, info, amount }) {
    const [isOpened, setisOpened] = useState(false)

    return <div className={s.container}>
        <motion.div key={title + 'img'} div className={s.img} >
            {img}
        </motion.div>
        <motion.div className={s.title} key={title}>
            {title}
        </motion.div>
        <motion.div className={s.description} key={description}>
            {description}
        </motion.div>
        <motion.div className={s.info} key={info}>
            {info}
        </motion.div>
        <motion.div className={s.amount} key={amount}>
            <span>{amount}<span className='mc'> Mc</span></span>
        </motion.div>
    </div>
}
