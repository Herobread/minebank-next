import cn from 'common/cn'
import s from './OptionButton.module.css'

export default function OptionButton({ img, disabled, ...props }) {
    disabled ??= false

    let styles = [s.button]

    if (disabled) {
        styles.push(s.disabled)
    }

    return <button className={cn(styles)} {...props}>
        {img}
    </button>
}
