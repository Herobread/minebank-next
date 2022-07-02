import Margin from "@/components/skeleton/Margin"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import Subtext from "@/components/UI/Subtext"
import WideCard from "@/components/UI/WideCard"
import twoDigits from "common/twoDigits"

export default function GenerateTransactionList({ data, sort }) {
    if (!data) {
        return <Subtext>You haven`t made any transactions yet.</Subtext>
    }

    const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let res = []
    let temp = ''
    let today = new Date()
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    data = [...data].reverse()

    let length = data.length - 1

    data.forEach((transaction, i) => {
        const { user, comment, timestamp, amount, img } = transaction

        let date = new Date(timestamp)
        let time = `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())} `
        let day = `${date.getDate()} ${monthes[date.getMonth()]} `

        let comment_ = comment || 'Transfer'

        if (sort === 'all' || transaction.tags.includes(sort)) {
            if (temp !== day) {
                const isToday = today.toDateString() === date.toDateString()
                const isYesterady = yesterday.toDateString() === date.toDateString()

                let header = day

                if (isToday) {
                    header = `Today, ${day} `
                } else if (isYesterady) {
                    header = `Yesterday, ${day} `
                }

                res.push(<Margin
                    key={timestamp + 'margin1'}
                    height={'11px'} />)
                res.push(<Subtext
                    key={timestamp + 'subtext'}
                >{header}</Subtext>)
            }
            res.push(<Margin height={'11px'}
                key={timestamp + 'margin2'}
            />)
            res.push(<WideCard
                id={length - i}
                key={timestamp}
                title={user}
                info={time}
                amount={amount}
                description={comment_}
                img={<ProfilePicture name={user} src={img} />}
            />)
        }

        temp = day
    })

    return <div>
        {res}
    </div>
}



/* 
<WideCard title='title' description='desc' info='12:34' amount='-10' img={<ProfilePicture name={'a'} src={''} />} />
*/