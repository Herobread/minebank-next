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
        buttons.push(<Button onClick={handleClick}
            disabled={item.value === selected}
            value={item.value}
            key={item.value}>{item.name}</Button>
        )
    })

    return <div className={s.container}>
        {buttons}
        todo:fix css
    </div >
}
