import Margin from "@/components/skeleton/Margin"
import Art from "@/components/UI/Art"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import Subtext from "@/components/UI/Subtext"
import WideCard from "@/components/UI/WideCard"
import { fadeAnimationVertical } from "@/lib/animations"
import twoDigits from "common/twoDigits"
import { motion, AnimatePresence } from 'framer-motion'
import TransferImg from '@/art/transfer.svg'
import SearchImg from '@/art/search.svg'

export default function GenerateTransactionList({ data, sort }) {
    if (!data || data.length === 0) {
        return <div>
            <Margin height={'50px'} />
            <Art img={<TransferImg />}>
                <Subtext>You haven`t made any transactions yet.</Subtext>
                <Margin height={'10px'} />
                <Subtext>Transfer money by pressing the transfer button on the top</Subtext>
            </Art>
        </div>
    }

    const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let res = []
    let temp = ''
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1);

    data = [...data].reverse()

    data = data.filter(transaction => {
        return sort === 'all' || transaction.tags.includes(sort)
    })

    data.forEach(transaction => {
        const { user, comment, timestamp, amount, img } = transaction

        let tempRes = []
        let date = new Date(timestamp)
        let time = `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())} `
        let day = `${date.getDate()} ${monthes[date.getMonth()]} `

        let comment_ = comment || 'Transfer'

        const isNewHeader = temp !== day

        if (isNewHeader) {
            const isToday = today.toDateString() === date.toDateString()
            const isYesterady = yesterday.toDateString() === date.toDateString()

            let header = day

            if (isToday) {
                header = `Today, ${day} `
            } else if (isYesterady) {
                header = `Yesterday, ${day} `
            }

            tempRes.push(
                <Margin
                    layout
                    key={timestamp + 'margin1'}
                    height={'11px'} />
            )

            tempRes.push(<Subtext key={header}>{header}</Subtext>)
        }

        tempRes.push(<Margin height={'11px'}
            layout
            key={timestamp + 'margin2'}
        />)

        tempRes.push(
            <WideCard
                layout
                key={timestamp}
                title={user}
                info={time}
                amount={amount}
                description={comment_}
                img={<ProfilePicture name={user} src={img} />}
            />
        )

        temp = day

        tempRes = <motion.div layout key={timestamp} {...fadeAnimationVertical}>
            {tempRes}
        </motion.div>

        res.push(tempRes)
    })

    if (!res.length) {
        res = (<motion.div layout key={'notransactions'} {...fadeAnimationVertical}>
            <Margin height={'50px'} />
            <Art img={<SearchImg />}>
                <Subtext>No transactions found with this filter</Subtext>
                <Margin height={'10px'} />
                <Subtext>Try doing some more different transactions or change filter</Subtext>
            </Art>
        </motion.div>
        )
    }

    return <div>
        <AnimatePresence>
            {res}
        </AnimatePresence>
    </div>
}
