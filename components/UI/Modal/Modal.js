import Button from '../Button'
import s from './Modal.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimations, opacityAnimation } from '@/lib/animations'

const dropIn = {
    hidden: {
        y: '-100',
        opcity: 0
    },
    visible: {
        y: '0',
        opcity: 1
    },
    exit: {
        y: '100',
        opcity: 0
    },
    transtion: {
        type: 'easInOut'
    }
}

export default function Modal({ isOpen, children, onClose }) {
    if (!isOpen) return null

    return <motion.div
        className={s.container}
        onClick={onClose}
        {...opacityAnimation}
    >
        <div className={s.modal}>
            {children}
            <Button onClick={onClose}>Close</Button>
        </div>
    </motion.div>
}
