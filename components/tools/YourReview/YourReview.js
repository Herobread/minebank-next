import ProfilePicture from '@/components/UI/ProfilePicture/ProfilePicture'
import WideCardWithOptions from '@/components/UI/WideCardWithOptions'
import { useAuth } from '@/context/AuthContext'
import StarEmpty from '@/icons/starEmpty.svg'
import Star from '@/icons/star.svg'
import { Rating } from 'react-simple-star-rating'
import Text from '@/components/UI/Text'
import Margin from '@/components/skeleton/Margin'
import FlexRow from '@/components/skeleton/FlexRow'
import Button from '@/components/UI/Button'
import Subtext from '@/components/UI/Subtext'

export default function YourReview({ reviews, handleAddReviewOpen, handleEditReviewOpen }) {
    const { user, userData } = useAuth()

    const review = reviews.find(review => review.byUid === user.uid)

    if (review == undefined) {
        return <>
            <Text>Want to share your opinion about this product? Press a button below to add a new review</Text>
            <Margin height={'10px'} />
            <FlexRow flexDirection={'row-reverse'}>
                <Button onClick={handleAddReviewOpen}>Add review</Button>
            </FlexRow>
        </>
    }

    const { img, by, rating, timestamp, comment } = review

    return <div>
        <WideCardWithOptions
            img={<ProfilePicture name={by} src={img} />}
            title={by}
            description={comment || `${rating}/5`}
            // info={toHHMM(timestamp)}
            buttons={<Rating
                readonly
                ratingValue={rating * 20}
                size={'10px'}
                allowHover={true}
                emptyIcon={<StarEmpty />}
                fullIcon={<Star />}
            />}
        />
        <FlexRow flexDirection={'row-reverse'}>
            <Button onClick={handleEditReviewOpen}>Edit review</Button>
        </FlexRow>
    </div>
}
