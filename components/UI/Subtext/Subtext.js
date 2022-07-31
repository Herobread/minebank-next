import cn from 'common/cn'
import { useEffect, useState } from 'react'
import s from './Subtext.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimationHeight, fadeAnimations } from '@/lib/animations'

export default function Subtext({ type, children, timeout, changeContent }) {
    // const [isShown, setIsShown] = useState(true)
    timeout ??= 0

    // changeContent is needed because it makes it work multiple times
    // if I used isShown it would need some kind of forced rerender

    useEffect(() => {
        let timeout_

        if (timeout)
            timeout_ = setTimeout(() => {
                // setIsShown(false)
                changeContent('')
            }, timeout)

        return () => {
            // setIsShown(true)
            clearTimeout(timeout_)
        }
    }, [children])

    type = cn([s.text, s[type]])

    return <AnimatePresence>
        <motion.div key={children} layout {...fadeAnimationHeight}>
            <p className={type}>{children}</p>
        </motion.div>
    </AnimatePresence>
}
