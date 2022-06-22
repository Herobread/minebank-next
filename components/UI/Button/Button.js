import s from './Button.module.css'

export default function Button({ children }) {
    return <button className={s.button}>
        {children}
    </button>
}
