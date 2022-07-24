import s from './Art.module.css'

export default function Art({ img, children, ...props }) {
    return <div className={s.container}>
        <div className={s.img}>
            {img}
        </div>
        {children}
    </div>
}
