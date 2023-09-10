import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
import Protected from "@/components/tools/Protected";
import Button from "@/components/UI/Button";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import Margin from "@/components/skeleton/Margin";
import VerticalList from "@/components/UI/VerticalList";
import { fadeAnimations, opacityAnimation } from "@/lib/animations";
import { navList } from "@/lib/configs";
import Header from "@/components/UI/Header";
import Mc from "@/components/UI/Mc";
import WideCard from "@/components/UI/WideCard";
import GenerateProducts from "@/components/tools/GenerateProducts";
import { useRouter } from "next/router";

export default function Shop() {
  const { userData, shopData } = useAuth();
  const router = useRouter();

  const availableProductsAmount = shopData?.length;

  const handleRedirect = () => {
    router.push("/shop/orders");
  };

  return (
    <div>
      <Protected requiredUserType={"user"} />
      <Navbar />
      <ContentWrapper>
        <motion.div {...fadeAnimations}>
          <Margin height={"20px"} />
          <Header
            subheader={`${availableProductsAmount} products found`}
            cta={<Button onClick={handleRedirect}>Orders</Button>}
          >
            Shop
          </Header>
          <Margin height={"20px"} />

          <GenerateProducts />
        </motion.div>
      </ContentWrapper>
    </div>
  );
}
