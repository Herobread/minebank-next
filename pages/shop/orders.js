import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Protected from "@/components/tools/Protected";
import Navbar from "@/components/UI/Navbar";
import { motion } from "framer-motion";
import Margin from "@/components/skeleton/Margin";
import { fadeAnimations } from "@/lib/animations";
import Header from "@/components/UI/Header";
import { useRouter } from "next/router";
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton";
import Cross from "@/icons/cross.svg";
import GeneratePersonalOrders from "@/components/tools/GeneratePersonalOrders";

export default function Orders() {
  const router = useRouter();

  const handleRedirectShop = () => {
    router.push("/shop");
  };

  return (
    <div>
      <Protected requiredUserType={"user"} />
      <Navbar />
      <ContentWrapper>
        <motion.div {...fadeAnimations}>
          <Margin height={"20px"} />
          <Header
            // subheader={'From shop'}
            cta={<OptionButton onClick={handleRedirectShop} img={<Cross />} />}
          >
            Shop orders
          </Header>
          <Margin height={"20px"} />
          <GeneratePersonalOrders />
        </motion.div>
      </ContentWrapper>
    </div>
  );
}
