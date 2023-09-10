import s from './Layout.module.css'

export default function Layout({ children }) {
    return <div className={s.container}>
        {children}
    </div>
}
