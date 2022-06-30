import s from './ProfilePicture.module.css'

export default function ProfilePicture({ name, src }) {
    if (src) {
        return <div className={s.container}>
            <img className={s.img} src={src} />
        </div>
    }

    if (name) {
        name = name.toUpperCase()

        return <div className={s.containerText}>
            <abbr className={s.text}>{name[0]}</abbr>
        </div>
    }

}
