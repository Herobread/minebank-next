import s from './Text.module.css'

export default function Text({ children }) {
    return <p className={s.text}>
        {children}
    </p>
}
