import Margin from "@/components/skeleton/Margin"
import Subtext from "@/components/UI/Subtext"
import WideCardWithOptions from "@/components/UI/WideCardWithOptions"
import { Rating } from "react-simple-star-rating"
import StarEmpty from '@/icons/starEmpty.svg'
import Star from '@/icons/star.svg'
import ProfilePicture from "@/components/UI/ProfilePicture/ProfilePicture"

export default function GenerateProductReviews({ reviews }) {
    console.log(reviews)

    if (reviews == null || reviews === []) {
        return <Subtext>No reviews yet</Subtext>
    }

    let res = []

    reviews.forEach(review => {
        const { img, by, rating, timestamp, comment } = review
        console.log(comment)

        res.push(<>
            <WideCardWithOptions
                img={<ProfilePicture name={by} src={img} />}
                title={by}
                description={comment || 'aboba'}
                info={timestamp}
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
