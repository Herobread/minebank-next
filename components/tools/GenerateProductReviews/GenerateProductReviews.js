import Margin from "@/components/skeleton/Margin"
import Subtext from "@/components/UI/Subtext"
import WideCardWithOptions from "@/components/UI/WideCardWithOptions"
import { Rating } from "react-simple-star-rating"
import StarEmpty from '@/icons/starEmpty.svg'
import Star from '@/icons/star.svg'
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"
import toHHMM from "common/toHHMM"

export default function GenerateProductReviews({ reviews }) {
    if (reviews == null || reviews.length === 0) {
        return <Subtext>No reviews yet</Subtext>
    }

    let res = []

    reviews.forEach(review => {
        const { img, by, rating, timestamp, comment } = review

        console.log(review)
        // let date = new Date(timestamp)

        res.push(<>
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
            <Margin height={'10px'} />
        </>)
    })

    return <div>
        {res}
    </div>
}
