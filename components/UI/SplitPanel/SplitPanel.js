import s from './SplitPanel.module.css'

export default function SplitPanel({ children }) {
    return <div className={s.container}>
        <div className={s.item1}>
            {children[0]}
        </div>
        <div className={s.item2}>
            {children[1]}
        </div>
    </div>
}
