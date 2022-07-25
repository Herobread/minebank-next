import Frame from '../Frame'
import Title from '../Title'
import s from './ThreeCards.module.css'

export default function ThreeCards() {
    return <Frame>
        <Title>Why Minebank?</Title>
        <div className={s.wrapper}>
            <Card header={'Free'} text={'no need to pay anything to use'} />
            <Card header={'Fast'} text={'instant transaction proccessing'} />
            <Card header={'Simple'} text={'so simple you already know how to use it'} />
        </div>
    </Frame>
}

function Card({ header, text }) {
    return <div className={s.container}>
        <h4>{header}</h4>
        <p>{text}</p>
    </div>
}
