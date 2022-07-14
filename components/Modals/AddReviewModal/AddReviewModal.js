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

export default function AddReviewModal({ isOpen, onClose }) {
    const { control, formState: { errors }, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        console.log(data)
    }

    return <AnimatePresence exitBeforeEnter={true}>
        asdas
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


                    <FlexRow flexDirection={'row-reverse'}>
                        <Button>Submit</Button>
                    </FlexRow>
                </form>
            </Modal>
        }
    </AnimatePresence>
}
