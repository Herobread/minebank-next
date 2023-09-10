import FlexRow from "@/components/skeleton/FlexRow";
import Margin from "@/components/skeleton/Margin";
import Split from "@/components/skeleton/Split";
import Button from "@/components/UI/Button";
import FileInput from "@/components/UI/FileInput";
import Header from "@/components/UI/Header";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import Subtext from "@/components/UI/Subtext";
import TextArea from "@/components/UI/TextArea";
import { useAuth } from "@/context/AuthContext";
import { formVerifiers } from "@/lib/configs";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function AddProductModal({ isOpen, onClose }) {
    const { control, formState: { errors }, handleSubmit } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const { createProduct, user, userData } = useAuth()

    const onSubmit = async (data) => {
        setIsLoading(true)
        setSuccess('')
        setError('')

        const { name } = data

        await createProduct(user.uid, userData, data)
            .then(() => {
                setSuccess(`Successfully created ${name}`)
            })
            .catch(err => {
                setError(`${err}`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return <AnimatePresence exitBeforeEnter={true}>
        {isOpen &&
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Header>Add new product</Header>
                    <Margin height={'10px'} />

                    {/* Item name */}
                    <Controller
                        defaultValue=''
                        name='name'
                        control={control}
                        rules={formVerifiers.required}
                        render={({ field }) => <Input label={'Item name'} {...field} />}
                    />
                    <Margin height={'5px'} />
                    <Subtext type={'error'}>
                        {errors.name && errors.name?.message}
                    </Subtext>
                    <Margin height={'5px'} />


                    <Split>
                        <div>
                            {/* Item price */}
                            <Controller
                                defaultValue=''
                                name='price'
                                control={control}
                                rules={formVerifiers.amount}
                                render={({ field }) => <Input label={'Price'} {...field} />}
                            />
                            <Margin height={'5px'} />
                            <Subtext type={'error'}>
                                {errors.price && errors.price?.message}
                            </Subtext>
                            <Margin height={'5px'} />
                        </div>
                        <div>
                            {/* inStock */}
                            <Controller
                                defaultValue=''
                                name='inStock'
                                control={control}
                                rules={formVerifiers.amount}
                                render={({ field }) => <Input label={'Stock amount'} {...field} />}
                            />
                            <Margin height={'5px'} />
                            <Subtext type={'error'}>
                                {errors.inStock && errors.inStock?.message}
                            </Subtext>
                            <Margin height={'5px'} />
                        </div>
                    </Split>
                    <Margin height={'5px'} />


                    {/* img */}
                    <FileInput name="img" control={control} label={'Product img'} initialImg={''} />

                    {/* <Controller
                        defaultValue=''
                        name='img'
                        control={control}
                        rules={formVerifiers.required}
                        render={({ field }) => <Input label={'Link to the image'} {...field} />}
                    /> */}
                    <Margin height={'5px'} />
                    <Subtext type={'error'}>
                        {errors.img && errors.img?.message}
                    </Subtext>
                    <Margin height={'5px'} />


                    {/* description */}
                    <Controller
                        defaultValue=''
                        name='description'
                        control={control}
                        // rules={ }
                        render={({ field }) => <TextArea label={'Description'} {...field} />}
                    />
                    <Margin height={'5px'} />
                    <Subtext type={'error'}>
                        {errors.description && errors.description?.message}
                    </Subtext>
                    <Margin height={'5px'} />

                    <Subtext type={'ok'}>{success && success}</Subtext>
                    <Subtext type={'error'}>{error && error}</Subtext>

                    <Margin height={'10px'} />
                    <FlexRow flexDirection={'row-reverse'}>
                        <Button type='submit' disabled={isLoading}>Create</Button>
                        {/* <Button onClick={onClose}>Cancel</Button> */}
                    </FlexRow>
                </form>
            </Modal>
        }
    </AnimatePresence>
}
