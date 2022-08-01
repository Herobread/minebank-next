import cn from 'common/cn'
import Image from 'next/image'
import s from './ProfilePicture.module.css'

export default function ProfilePicture({ name, src, isSharp }) {
    let style = s.img

    if (isSharp) {
        style = cn([s.img, s.sharp])
    }

    if (src) {
        return <div className={s.container}>
            <Image className={style} src={src} height={50} width={50} />
        </div>
    }

    if (name) {
        name = name.toUpperCase()

        return <div className={s.containerText}>
            <abbr className={s.text}>{name[0]}</abbr>
        </div>
    }

}
