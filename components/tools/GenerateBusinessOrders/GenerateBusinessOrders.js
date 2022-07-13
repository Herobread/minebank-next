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

export default function GenerateBusinessOrders() {
    const { userData, updateOrderStatus } = useAuth()
    let res = []

    if (userData?.businessOrders == null) {
        return <Subtext>No new orders found</Subtext>
    }

    res.push(<>
        <Subtext>New orders</Subtext>
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

    userData?.businessOrders?.forEach(order => {
        const time = order.key


        if (order.status === 'waiting') {
            res.push(<>
                <WideCardWithOptions
                    title={order.authorUsername}
                    description={`${order.name}, ${order.price} Mc`}
                    info={toHHMM(time)}
                    img={<ProfilePicture name={'w'} />}
                    buttons={<>
                        <OptionButton onClick={() => { handleConfirm(order) }} img={<Tick />} />
                        <OptionButton img={<Clock />} />
                        <OptionButton onClick={() => { handleCancel(order) }} img={<Cross />} />
                    </>}
                />
                <Margin height={'10px'} />
            </>)
        }

    })

    return <>
        {res}
    </>
}
