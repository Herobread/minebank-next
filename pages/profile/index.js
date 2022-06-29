import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Profile() {
    const { user, logout } = useAuth()

    const handleClick = () => {
        logout()
    }

    return <div>
        <Navbar />
        <ContentWrapper>
            uid: {user?.uid}
            <Button onClick={handleClick}>Sign out</Button>

            <Subtext>
                <Link href='/'><a>Home</a></Link>
            </Subtext>
        </ContentWrapper>
    </div>
}
