import ContentWrapper from '@/components/skeleton/ContentWrapper'
import Button from '@/components/UI/Button'
import Header from '@/components/UI/Header'
import Navbar from '@/components/UI/Navbar'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function Home() {
    const { createUserDocument } = useAuth()

    return <div>
        <Navbar />
        <ContentWrapper>
            <Header>Welcome!</Header>
            <Link href='login'><a>login</a></Link>
            <br />
            <Link href='bank'><a>bank</a></Link>


            <Button onClick={() => {
                createUserDocument('1236353424321', { aaa: 'bbb' })
            }}>Funny button</Button>
        </ContentWrapper>
    </div>
}
