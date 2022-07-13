import Margin from "@/components/skeleton/Margin"
import Subtext from "@/components/UI/Subtext"
import WideCardWithOptions from "@/components/UI/WideCardWithOptions"
import { useAuth } from "@/context/AuthContext"
import Tick from '@/icons/tick.svg'
import Cross from '@/icons/cross.svg'
import Clock from '@/icons/clock.svg'
import toHHMM from "common/toHHMM"
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import OptionButton from "@/components/UI/WideCardWithOptions/OptionButton"

export default function GeneratePersonalOrders() {
    const { userData } = useAuth()

    const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const today = new Date()
    const yesterday = new Date()


    let res = []

    if (userData?.personalOrders == null) {
        return <Subtext>No orders found</Subtext>
    }

    let data = userData?.personalOrders
    let temp = ''

    data = [...data].reverse()

    data.forEach(order => {
        const time = order.key

        let orderDate = new Date(time)
        let day = `${orderDate.getDate()} ${monthes[orderDate.getMonth()]} `

        const isNewHeader = temp !== day

        temp = day

        if (isNewHeader) {
            const isToday = today.toDateString() === orderDate.toDateString()
            const isYesterady = yesterday.toDateString() === orderDate.toDateString()

            let header = day

            if (isToday) {
                header = `Today, ${day} `
            } else if (isYesterady) {
                header = `Yesterday, ${day} `
            }

            res.push(<>
                <Subtext key={header}>{header}</Subtext>
                <Margin
                    key={time + 'margin1'}
                    height={'11px'} />
            </>)
        }

        const statusIcons = {
            'waiting': <Clock />,
            'delivered': <Tick />,
            'canceled': <Cross />,
        }

        const statusIcon = statusIcons[order.status]


        res.push(<>
            <WideCardWithOptions
                title={order.name}
                description={`From ${order.authorUsername}, ${order.price} Mc`}
                info={toHHMM(time)}
                img={<ProfilePicture name={'w'} />}
                buttons={<OptionButton disabled={true} img={statusIcon} />}
            />
            <Margin height={'10px'} />
        </>)
    })

    return <div>
        {res}
    </div>
}
