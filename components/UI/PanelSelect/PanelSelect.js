import cn from 'common/cn'
import Subtext from '../Subtext'
import s from './PanelSelect.module.css'

export default function PanelSelect({ data, selected, callback }) {
    let res = []

    if (!data) {
        return <Subtext>Send money to someone, to save them to quick access here</Subtext>
    }

    data.forEach(item => {
        const isSelected = item === selected
        res.push(<Panel key={item} text={item} callback={callback} isSelected={isSelected} />)
    })

    return <div className={s.container}>
        {res}
    </div>
}

function Panel({ text, callback, isSelected }) {
    const style = isSelected ? cn([s.item, s.active]) : s.item

    const handleClick = () => {
        if (!isSelected)
            callback(text)
        else
            callback('')
    }

    return <div className={style} onClick={handleClick}>
        {text}
    </div>
}