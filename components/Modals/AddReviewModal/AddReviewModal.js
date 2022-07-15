import FlexRow from "@/components/skeleton/FlexRow";
import Margin from "@/components/skeleton/Margin";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Modal from "@/components/UI/Modal";
import Subtext from "@/components/UI/Subtext";
import TextArea from "@/components/UI/TextArea";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import StarEmpty from '@/icons/starEmpty.svg'
import Star from '@/icons/star.svg'
import Center from "@/components/skeleton/Center";
import Text from "@/components/UI/Text";
import { useAuth } from "@/context/AuthContext";

export default function AddReviewModal({ isOpen, onClose, id }) {
    const { control, formState: { errors }, handleSubmit } = useForm()
    const { addReview, userData } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [rating, setRating] = useState(100)

    const handleRating = (rate) => {
        setRating(rate)
    }

    const onSubmit = async (data) => {
        setIsLoading(true)

        data.rating = rating / 20

        addReview({
            id: id,
            from: userData,
            review: data
        })

        setIsLoading(false)
    }

    return <AnimatePresence exitBeforeEnter={true}>
        {
            isOpen &&
            <Modal onClose={onClose} isOpen={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Header>Add review</Header>
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


                    <FlexRow flexDirection={'row-reverse'}>
                        <Button>Submit</Button>
                    </FlexRow>
                </form>
            </Modal>
        }
    </AnimatePresence>
}
