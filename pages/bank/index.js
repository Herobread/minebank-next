import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Margin from "@/components/skeleton/Margin";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Mc from "@/components/UI/Mc";
import Navbar from "@/components/UI/Navbar";
import Subtext from "@/components/UI/Subtext";
import WideCard from "@/components/UI/WideCard";


export default function Bank() {
    return <div>
        <Navbar />
        <ContentWrapper>
            <Margin height={'20px'} />

            <Header
                subheader='your balance'
                cta={<Button>Transfer</Button>}>
                100 <Mc>Mc</Mc>
            </Header>
            <Margin height={'20px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />

            <Subtext>26 June</Subtext>
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
            <WideCard title='title' description='desc' info='12:34' amount='10' />
            <Margin height={'10px'} />
        </ContentWrapper>
    </div>
}
