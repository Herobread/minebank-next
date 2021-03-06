import Button from '../Button'
import s from './Modal.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimations, opacityAnimation } from '@/lib/animations'
import OptionButton from '../WideCardWithOptions/OptionButton'

import Cross from '@/icons/cross.svg'
import FlexRow from '@/components/skeleton/FlexRow'

export default function Modal({ isOpen, children, onClose }) {
    if (!isOpen) return null

    return <motion.div
        className={s.container}
        {...opacityAnimation}
    >
        <div className={s.modal}>
            <FlexRow flexDirection={'row-reverse'}>
                <OptionButton img={<Cross />} onClick={onClose} />
            </FlexRow>
            {children}
            {/* <Button onClick={onClose}>Close</Button> */}
        </div>
    </motion.div>
}
