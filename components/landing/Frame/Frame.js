import s from './Frame.module.css'
import { motion } from 'framer-motion'

export default function Frame({ children }) {
    return <div className={s.container}>
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            {children}
        </motion.div>
    </div>
}
