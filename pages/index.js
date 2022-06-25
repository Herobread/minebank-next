import Header from '@/components/UI/Header'
import Link from 'next/link'

export default function Home() {
    return <div>
        <Header>Welcome!</Header>
        <Link href='login'><a>login</a></Link>
    </div>
}
