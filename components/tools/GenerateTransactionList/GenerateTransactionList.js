import Margin from "@/components/skeleton/Margin"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import Subtext from "@/components/UI/Subtext"
import WideCard from "@/components/UI/WideCard"
import twoDigits from "common/twoDigits"
import { motion, AnimatePresence } from 'framer-motion'

export default function GenerateTransactionList({ data, sort }) {
    if (!data) {
        return <Subtext>You haven`t made any transactions yet.</Subtext>
    }

    const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const animations = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { type: 'spring', stiffness: 700, damping: 70 }
    }

    let res = []
    let temp = ''
    let today = new Date()
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    data = [...data].reverse()

    let length = data.length - 1

    data = data.filter(transaction => {
        return sort === 'all' || transaction.tags.includes(sort)
    })

    data.forEach(transaction => {
        const { user, comment, timestamp, amount, img } = transaction

        let date = new Date(timestamp)
        let time = `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())} `
        let day = `${date.getDate()} ${monthes[date.getMonth()]} `

        let comment_ = comment || 'Transfer'

        const isNewHeader = temp !== day

        console.log(timestamp)

        if (isNewHeader) {
            const isToday = today.toDateString() === date.toDateString()
            const isYesterady = yesterday.toDateString() === date.toDateString()

            let header = day

            if (isToday) {
                header = `Today, ${day} `
            } else if (isYesterady) {
                header = `Yesterday, ${day} `
            }

            res.push(
                <Margin
                    key={timestamp + 'margin1'}
                    height={'11px'} />
            )

            res.push(
                <motion.div layout key={header} {...animations}>
                    <Subtext>{header}</Subtext>
                </motion.div>
            )
        }

        res.push(<Margin height={'11px'}
            key={timestamp + 'margin2'}
        />)

        res.push(<motion.div layout key={timestamp} {...animations}>
            <WideCard
                title={user}
                info={time}
                amount={amount}
                description={comment_}
                img={<ProfilePicture name={user} src={img} />}
            />
        </motion.div>
        )

        temp = day
    })

    if (!res.length) {
        res.push(<Margin height={'11px'} key={'notransactionsm'} />)
        res.push(<Subtext key={'notransactions'}>No transactions found</Subtext>)
    }

    return <div>
        <AnimatePresence>
            {res}
        </AnimatePresence>
    </div>
}
