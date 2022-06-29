import ContentWrapper from '@/components/skeleton/ContentWrapper'
import Header from '@/components/UI/Header'
import Navbar from '@/components/UI/Navbar'
import Link from 'next/link'

export default function Home() {
    return <div>
        <Navbar />
        <ContentWrapper>
            <Header>Welcome!</Header>
            <Link href='login'><a>login</a></Link>
            <Link href='bank'><a>bank</a></Link>
        </ContentWrapper>
    </div>
}
