import cn from 'common/cn'
import s from './ProfilePicture.module.css'

export default function ProfilePicture({ name, src, isSharp }) {
    let style = s.container

    if (isSharp) {
        style = cn([s.img, s.sharp])
    }

    if (src) {
        return <div className={s.container}>
            <img className={style} src={src} />
        </div>
    }

    if (name) {
        name = name.toUpperCase()

        return <div className={s.containerText}>
            <abbr className={s.text}>{name[0]}</abbr>
        </div>
    }

}
