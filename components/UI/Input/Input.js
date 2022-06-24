import s from './Input.module.css'

export default function Input({ label, ...props }) {
    return <div className={s.container}>
        <label className={s.label}>
            {label}
        </label>
        <br />
        <input className={s.input} {...props} />
    </div>
}
