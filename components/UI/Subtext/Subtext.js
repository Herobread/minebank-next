import cn from 'common/cn'
import { useEffect, useState } from 'react'
import s from './Subtext.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimationHeight, fadeAnimations } from '@/lib/animations'

export default function Subtext({ type, children, timeout }) {

    const [isShown, setIsShown] = useState(true)
    // timeout ??= 0

    // useEffect(() => {
    //     console.log(timeout)
    //     if (timeout)
    //         setTimeout(() => {
    //             setIsShown(false)
    //         }, timeout);

    //     return () => { }
    // }, [timeout])

    type = cn([s.text, s[type]])

    return <AnimatePresence>
        {
            isShown && <motion.div key={children} layout {...fadeAnimationHeight}>
                <p className={type}>{children}</p>
            </motion.div>
        }
    </AnimatePresence>
}
