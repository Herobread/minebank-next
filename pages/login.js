import Center from "@/components/skeleton/Center";
import FlexRow from "@/components/skeleton/FlexRow";
import FocusPanel from "@/components/skeleton/FocusPanel";
import Margin from "@/components/skeleton/Margin";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Input from "@/components/UI/Input";
import Subtext from "@/components/UI/Subtext";
import Link from "next/link";

export default function Login() {
  return <div>
    <FocusPanel>
      <Center>
        <Header>Welcome back!</Header>

        <Margin height='10px' />
        <Input label="Email" />
        <Margin height='10px' />
        <Input label="Password" />
        <Margin height='10px' />
        <Subtext>Don`t have an account? <Link href="/"><a>Sign up</a></Link></Subtext>
        <Margin height='20px' />
        <FlexRow flexDirection={'row-reverse'}>
          <Button>Log in</Button>
        </FlexRow>
      </Center>
    </FocusPanel>
  </div>
}
