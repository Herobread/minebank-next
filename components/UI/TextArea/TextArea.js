import s from './TextArea.module.css'

export default function Input({ label, ...props }) {
    return <div className={s.container}>
        <label className={s.label}>
            {label}
        </label>
        <br />
        <div className={s.inputContainer}>
            <textarea rows={4} className={s.input} {...props} />
        </div>
    </div>
}
