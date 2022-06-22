import s from './FocusPanel.module.css'

export default function FocusPanel({ children }) {
    return <div className={s.container}>
        {children}
    </div>
}
