import cn from 'common/cn'
import s from './Button.module.css'

export default function Button({ disabled, children, ...props }) {
    let style = disabled ? cn([s.disabled, s.button]) : s.button
    return <button
        className={style}
        disabled={disabled}
        {...props}
    >
        {children}
    </button>
}
