import Hero from "@/components/landing/Hero";
import ThreeCards from "@/components/landing/ThreeCards";
import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Navbar from "@/components/UI/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ContentWrapper>
        <Header
          subheader={"Capitalizm addition to minecraft"}
          cta={
            <Link href={"/signup"}>
              <Button>Sign up</Button>
            </Link>
          }
        >
          Minebank
        </Header>
      </ContentWrapper>
    </div>
  );
}
