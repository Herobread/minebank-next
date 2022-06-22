import s from './Center.module.css'

export default function Center({ children }) {
    return <div className={s.container}>
        {children}
    </div>
}
