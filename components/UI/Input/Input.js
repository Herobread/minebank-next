import s from './Input.module.css'

import View from '@/icons/view.svg'
import ViewClosed from '@/icons/closed.svg'

import { useState } from 'react'

export default function Input({ label, ...props }) {
    const [isVisible, setIsVisible] = useState(false)

    const handleShow = () => { setIsVisible(!isVisible) }

    const { type } = props
    const passwordButtonType = isVisible ? <View className={s.icon} onClick={handleShow} /> : <ViewClosed className={s.icon} onClick={handleShow} />
    const passwordButton = type === 'password' ? passwordButtonType : ''
    let typeOfInput = (isVisible && type === 'password') || type === 'text' || type === undefined ? 'text' : 'password'

    return <div className={s.container}>
        <label className={s.label}>
            {label}
        </label>
        <br />
        <div className={s.inputContainer}>
            {passwordButton}
            <input className={s.input} {...props} type={typeOfInput} />
        </div>
    </div>
}
