import Center from "@/components/skeleton/Center";
import FlexRow from "@/components/skeleton/FlexRow";
import FocusPanel from "@/components/skeleton/FocusPanel";
import Margin from "@/components/skeleton/Margin";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Input from "@/components/UI/Input";
import Subtext from "@/components/UI/Subtext";

export default function Home() {
  return <div>
    <FocusPanel>
      <Center>
        <Header>Welcome!</Header>

        <Margin height='20px' />
        <Input label="Nickname" />
        <Margin height='10px' />
        <Input label="Email" />
        <Margin height='10px' />
        <Input label="Password" />

        <Subtext></Subtext>

        <Margin height='20px' />
        <FlexRow flexDirection={'row-reverse'}>
          <Button>Sign up</Button>
        </FlexRow>
      </Center>
    </FocusPanel>
  </div>
}
