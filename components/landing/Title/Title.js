import s from './Title.module.css'

export default function Title({ children }) {
    return <h2 className={s.header}>{children}</h2>
}
