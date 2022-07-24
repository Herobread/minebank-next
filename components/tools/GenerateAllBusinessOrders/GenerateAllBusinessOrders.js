import Margin from '@/components/skeleton/Margin'
import ProfilePicture from '@/components/UI/ProfilePicture/ProfilePicture'
import Subtext from '@/components/UI/Subtext'
import WideCardWithOptions from '@/components/UI/WideCardWithOptions'
import OptionButton from '@/components/UI/WideCardWithOptions/OptionButton'
import { useAuth } from '@/context/AuthContext'
import Tick from '@/icons/tick.svg'
import Cross from '@/icons/cross.svg'
import Clock from '@/icons/clock.svg'
import toHHMM from 'common/toHHMM'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeAnimationHeight } from '@/lib/animations'
import Art from '@/components/UI/Art'
import OrderImg from '@/art/order.svg'

export default function GenerateBusinessOrders() {
    const { userData, updateOrderStatus } = useAuth()

    const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let res = []

    let temp = ''
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1);


    if (!userData?.businessOrders || userData?.businessOrders.length === 0) {
        return <>
            <Margin height={'10px'} />
            <Art img={<OrderImg />}>
                <Subtext>You don`t have any ordes</Subtext>
                <Margin height={'10px'} />
                <Subtext>Try promoting your products</Subtext>
            </Art>
        </>
    }


    res.push(<>
        {/* <Subtext>New orders</Subtext> */}
        <Margin height={'10px'} />
    </>)

    const handleConfirm = (order) => {
        updateOrderStatus({
            buyerUid: order.buyerUid,
            sellerUid: order.sellerUid,
            key: order.key,
            status: "delivered"
        })
    }

    const handleCancel = (order) => {
        updateOrderStatus({
            buyerUid: order.buyerUid,
            sellerUid: order.sellerUid,
            key: order.key,
            status: "canceled"
        })
    }

    let profit = 0
    let soldAmount = 0

    let data = userData?.businessOrders

    data = [...data].reverse()

    data.forEach(order => {
        const time = order.key

        let orderDate = new Date(time)
        let day = `${orderDate.getDate()} ${monthes[orderDate.getMonth()]} `

        const isNewHeader = temp !== day

        temp = day

        if (isNewHeader) {
            const isToday = today.toDateString() === orderDate.toDateString()
            const isYesterday = yesterday.toDateString() === orderDate.toDateString()

            let header = day

            if (isToday) {
                header = `Today, ${day} `
            } else if (isYesterday) {
                header = `Yesterday, ${day} `
            }

            res.push(<div key={time + 'header'}>
                <Subtext key={header}>{header}</Subtext>
                <Margin height={'11px'} />
            </div>)
        }

        if (order.status === 'waiting') {
            res.push(<motion.div key={time} {...fadeAnimationHeight}>
                <WideCardWithOptions
                    title={order.authorUsername}
                    description={`${order.name}, ${order.price} Mc`}
                    info={toHHMM(time)}
                    img={<ProfilePicture isSharp={true} src={order.img} />}
                    buttons={<>
                        <OptionButton onClick={() => { handleConfirm(order) }} img={<Tick />} />
                        <OptionButton img={<Clock />} />
                        <OptionButton onClick={() => { handleCancel(order) }} img={<Cross />} />
                    </>}
                />
                <Margin height={'10px'} />
            </motion.div>)
        } else {
            let button = []

            if (order.status === 'delivered') {
                button = <OptionButton disabled={true} img={<Tick />} />
            }
            if (order.status === 'canceled') {
                button = <OptionButton disabled={true} img={<Cross />} />
            }

            res.push(<motion.div key={time} {...fadeAnimationHeight}>
                <WideCardWithOptions
                    title={order.authorUsername}
                    description={`${order.name}, ${order.price} Mc`}
                    info={toHHMM(time)}
                    img={<ProfilePicture isSharp={true} name={'w'} src={order.img} />}
                    buttons={button}
                />
                <Margin height={'10px'} />
            </motion.div>)
        }
    })

    console.log(res)
    if (res.length === 1) {
        res = <>
        </>
    }

    return <AnimatePresence>
        {res}
    </AnimatePresence>
}
