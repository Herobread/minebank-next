import s from './ShopGrid.module.css'

export default function ShopGrid({ children }) {
    return <div className={s.container}>
        {children}
    </div>
}
