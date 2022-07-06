import cn from 'common/cn'
import s from './Center.module.css'

export default function Center({ children, isHorizontal }) {

    isHorizontal ??= false

    const style = isHorizontal ? cn([s.container, s.horizontal]) : s.container
    return <div className={style}>
        {children}
    </div>
}
