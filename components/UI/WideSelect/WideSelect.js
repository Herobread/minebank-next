import cn from 'common/cn'
import { useState } from 'react'
import Button from '../Button'
import s from './WideSelect.module.css'

export default function WideSelect({ options, callback, selectedAtStart }) {
    const [selected, setSelected] = useState(selectedAtStart)

    const handleClick = (e) => {
        e.preventDefault()
        setSelected(e.target.value)

        console.log(e.target)
        callback(e.target.value)
    }

    let buttons = []

    options.forEach(item => {
        const buttonStyle = item.value === selected ? cn([s.button, s.active]) : s.button

        buttons.push(<button onClick={handleClick}
            disabled={item.value === selected}
            value={item.value}
            className={buttonStyle}
            key={item.value}>{item.name}</button>
        )
    })

    return <div className={s.container}>
        {buttons}
    </div >
}
