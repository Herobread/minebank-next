import FlexRow from "@/components/skeleton/FlexRow";
import Margin from "@/components/skeleton/Margin";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Modal from "@/components/UI/Modal";
import Subtext from "@/components/UI/Subtext";
import TextArea from "@/components/UI/TextArea";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import StarEmpty from '@/icons/starEmpty.svg'
import Star from '@/icons/star.svg'
import Center from "@/components/skeleton/Center";
import Text from "@/components/UI/Text";
import { useAuth } from "@/context/AuthContext";

export default function EditReviewModal({ isOpen, onClose, id, reviews }) {
    const { control, formState: { errors }, handleSubmit, setValue } = useForm()
    const { addReview, userData, user } = useAuth()

    const review = reviews.find(review => review.byUid === user.uid)

    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
        setRating(rate)
    }

    const onSubmit = async (data) => {
        setIsLoading(true)

        data.rating = rating / 20

        await addReview({
            id: id,
            byUid: user.uid,
            from: userData,
            review: data
        })

        setSuccess('Review updated')

        setIsLoading(false)
    }

    useEffect(() => {
        console.log(review)
        if (review !== undefined) {
            setRating(review.rating * 20)
            setValue('comment', review.comment, { shouldValidate: true })
        }

        return () => { }
    }, [reviews])


    return <AnimatePresence exitBeforeEnter={true}>
        {
            isOpen &&
            <Modal onClose={onClose} isOpen={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Header>Edit review</Header>
                    <Margin height={'10px'} />

                    {/* review */}
                    <Controller
                        defaultValue=''
                        name='comment'
                        control={control}
                        // rules={ }
                        render={({ field }) => <TextArea label={'What do you think about this product?'} {...field} />}
                    />
                    <Margin height={'5px'} />
                    <Subtext type={'error'}>
                        {errors.comment && errors.comment?.message}
                    </Subtext>
                    <Margin height={'5px'} />

                    <Center isHorizontal={true}>
                        <Rating
                            transition
                            onClick={handleRating}
                            ratingValue={rating}
                            size={'10px'}
                            allowHover={true}
                            emptyIcon={<StarEmpty />}
                            fullIcon={<Star />}
                        />
                    </Center>

                    {success && <Subtext type='ok'>{success}</Subtext>}
                    {/* <Margin height={'5px'} />
                    <Margin height={'5px'} /> */}

                    <FlexRow flexDirection={'row-reverse'}>
                        <Button>Save</Button>
                    </FlexRow>
                </form>
            </Modal>
        }
    </AnimatePresence>
}
