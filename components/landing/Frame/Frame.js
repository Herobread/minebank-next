import s from './Frame.module.css'

export default function Frame({ children }) {
    return <div className={s.container}>
        {children}
    </div>
}
