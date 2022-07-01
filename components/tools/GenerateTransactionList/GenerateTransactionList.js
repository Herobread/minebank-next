export default function GenerateTransactionList({ data, sort }) {
    return <div>{JSON.stringify(data)}{sort}</div>
}



/* 
<Subtext>26 June</Subtext>
<Margin height={'10px'} />
<WideCard title='title' description='desc' info='12:34' amount='-10' img={<ProfilePicture name={'a'} src={''} />} />
*/