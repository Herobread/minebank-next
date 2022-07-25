import s from './Hero.module.css'
import Frame from '@/components/landing/Frame'
import Center from '@/components/skeleton/Center'
import Button from '@/components/UI/Button'
import FlexRow from '@/components/skeleton/FlexRow'
import Margin from '@/components/skeleton/Margin'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function Hero() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/signup')
    }

    return <Frame>
        <h1 className={s.header}>Minebank</h1>
        <p className={s.subheader}>The diamond managing app</p>
        <Margin height={'10px'} />
        <div>
            <Center isHorizontal={true}>
                <Button type='accent' onClick={handleClick}>Sign up</Button>
            </Center>
        </div>
    </Frame >
}
