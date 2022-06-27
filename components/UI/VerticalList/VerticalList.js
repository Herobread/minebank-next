import cn from 'common/cn';
import Link from 'next/link';
import s from './VerticalList.module.css'

export default function VerticalList({ list }) {
    let items = []

    list.forEach(item => {
        const style = item.isHighlighted ? cn([s.item, s.highlight]) : s.item

        items.push(<li className={style}>
            <Link href={item.to}>
                <a>
                    {item.name}
                </a>
            </Link>
        </li>
        )
    });

    return <ul className={s.container}>
        {items}
    </ul>
}
