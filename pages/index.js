import Hero from '@/components/landing/Hero'
import ThreeCards from '@/components/landing/ThreeCards'
import ContentWrapper from '@/components/skeleton/ContentWrapper'
import Header from '@/components/UI/Header'
import Navbar from '@/components/UI/Navbar'
import Link from 'next/link'

export default function Home() {
    return <div>
        <Navbar />
        <Hero />
        <ThreeCards />
    </div>
}
