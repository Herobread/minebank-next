import cn from 'common/cn'
import s from './Subtext.module.css'

export default function Subtext({ type, children }) {

    type = cn([s.text, s[type]])

    return <p className={type}>{children}</p>
}
