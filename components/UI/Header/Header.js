import Button from '../Button'
import s from './Header.module.css'

export default function Header({ subheader, cta, children }) {
    return <div className={s.container}>
        <div>
            <h3 className={s.header}>
                {children}
            </h3>
            <h5 className={s.subheader}>{subheader}</h5>
        </div>

        <div className={s.cta}>
            {cta}
        </div>
    </div>
}
