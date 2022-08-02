import Margin from '@/components/skeleton/Margin'
import Image from 'next/image'
import Button from '../../Button'
import Mc from '../../Mc'
import s from './WideProductCard.module.css'

export default function WideProductCard({ data, buy, isLoading }) {
    const { name, img, price, created } = data

    return <div className={s.container}>
        <div className={s.imgContainer} >
            <div className={s.imgWrapper} >
                <Image
                    layout='fill'
                    objectFit='contain'
                    width='100%'
                    // height='150px'
                    src={img}
                />
            </div>
        </div>
        <div className={s.contentContainer}>
            <p className={s.name} >{name}</p>
            <pre className={s.price} >{price} <Mc>Mc</Mc></pre>
            <Margin height={'7px'} />
            <Button
                onClick={buy}
                type={'accent'}
                disabled={isLoading}
            >Buy</Button>
        </div>
    </div>
}
