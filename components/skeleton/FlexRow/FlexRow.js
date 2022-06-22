import s from './FlexRow.module.css'

export default function FlexRow({ flexDirection, children }) {
    flexDirection ??= 'row'
    return <div className={s.container}
        style={{ flexDirection: flexDirection }}>
        {children}
    </div>
}
