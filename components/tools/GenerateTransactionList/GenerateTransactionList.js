import Margin from "@/components/skeleton/Margin"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import Subtext from "@/components/UI/Subtext"
import WideCard from "@/components/UI/WideCard"

export default function GenerateTransactionList({ data, sort }) {
    if (!data) {
        return <Subtext>You haven`t made any transactions yet.</Subtext>
    }

    let res = []

    data.forEach(transaction => {
        console.log(transaction)

        const { user, comment, timestamp, amount, img } = transaction

        let comment_ = comment || 'Transfer'

        res.unshift(<WideCard
            title={user}
            info={timestamp}
            amount={amount}
            description={comment_}
            img={<ProfilePicture name={user} src={img} />}
        />)
        res.unshift(<Margin height={'15px'} />)
    })
    // { tags: Array(2), comment: 'comment', amount: '-1', timestamp: '123456', user: 'amogus' }

    return <div>
        {res}
    </div>
}



/* 
<Subtext>26 June</Subtext>
<WideCard title='title' description='desc' info='12:34' amount='-10' img={<ProfilePicture name={'a'} src={''} />} />
*/