import cn from 'common/cn'
import s from './Button.module.css'

export default function Button({ disabled, type, children, ...props }) {
    let styles = []
    styles.push(s.button)

    if (disabled) {
        styles.push(s.disabled)
    }

    if (type === 'danger') {
        styles.push(s.danger)
    }

    if (type === 'accent') {
        styles.push(s.accent)
    }

    if (type === 'wide') {
        styles.push(s.wide)
    }

    styles = cn(styles)

    return <button
        className={styles}
        disabled={disabled}
        {...props}
    >
        {children}
    </button>
}
