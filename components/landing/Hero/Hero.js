import s from './Hero.module.css'
import Frame from '@/components/landing/Frame'
import Center from '@/components/skeleton/Center'
import Button from '@/components/UI/Button'
import FlexRow from '@/components/skeleton/FlexRow'

export default function Hero() {
    return <Frame>
        <div>
            <h1 className={s.header}>Minebank</h1>
            <p className={s.subheader}>The best diamond managing app</p>
            <Button>Sign up</Button>
        </div>
    </Frame >
}
