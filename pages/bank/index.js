import ContentWrapper from "@/components/skeleton/ContentWrapper";
import Layout from "@/components/skeleton/Layout";
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
            <Layout>
                <div>
                    <Margin height={'95px'} mobile={'0'} />
                    Content<br />
                    Content<br />
                    Content<br />
                    Content<br />
                    Content<br />
                </div>
                <div>

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
                </div>
            </Layout>
        </ContentWrapper>
    </div>
}
