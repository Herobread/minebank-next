import s from './SubHeader.module.css'

export default function SubHeader({ children }) {
    return <h4 className={s.text}>
        {children}
    </h4>
}
