import cn from 'common/cn'
import { useState } from 'react'
import s from './TagSelect.module.css'

export default function TagSelect({ options, callback, selectedAtStart }) {
    const [selected, setSelected] = useState(selectedAtStart)

    let buttons = []

    const handleClick = (e) => {
        e.preventDefault()
        setSelected(e.target.value)
        callback(e.target.value)
    }

    options.forEach(item => {
        const buttonStyle = item.value === selected ? cn([s.item, s.active]) : s.item

        buttons.push(<button onClick={handleClick}
            disabled={item.value === selected}
            value={item.value}
            className={buttonStyle}
            key={item.value}>{item.name}</button>
        )
    })

    return <div className={s.container}>
        {buttons}
    </div>
}
