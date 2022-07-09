import FlexRow from "@/components/skeleton/FlexRow";
import Margin from "@/components/skeleton/Margin";
import Split from "@/components/skeleton/Split";
import Button from "@/components/UI/Button";
import Header from "@/components/UI/Header";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import Subtext from "@/components/UI/Subtext";
import TextArea from "@/components/UI/TextArea";
import { useAuth } from "@/context/AuthContext";
import { formVerifiers } from "@/lib/configs";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function EditProductModal({ isOpen, onClose, data }) {
    const { control, formState: { errors }, handleSubmit, setValue } = useForm()
    const { updateProduct, deleteProduct } = useAuth()

    const handleClose = () => {
        setSuccess('')
        setIsLoading('')
        onClose()
    }

    const name = data?.product?.name
    const price = data?.product?.price
    const inStock = data?.product?.inStock
    const img = data?.product?.img
    const description = data?.product?.description
    const created = data?.product?.created
    const sold = data?.product?.sold
    const id = `${created}`

    useEffect(() => {
        if (!data)
            return

        setValue('name', name, { shouldValidate: true })
        setValue('price', price, { shouldValidate: true })
        setValue('inStock', inStock, { shouldValidate: true })
        setValue('img', img, { shouldValidate: true })
        setValue('description', description, { shouldValidate: true })

        return () => { }
    }, [name, price, inStock, img, description])

    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [submitType, setSubmitType] = useState('save')

    const onSubmit = async (data) => {
        setIsLoading(true)

        console.log(data)
        if (submitType === 'save') {
            const data_ = {
                product: {
                    ...data,
                    sold: sold,
                    created: created
                }
            }

            await updateProduct(id, data_)

            setSuccess('Successfully updated product info')
            setIsLoading(false)

            return
        }

        if (submitType === 'delete') {
            await deleteProduct(id)

            setSuccess('Product successfully deleted')
            handleClose()
            setIsLoading(false)
            setSuccess('')

            return
        }
    }

    const handleSave = () => {
        console.log('save')
        setSubmitType('save')
    }

    const handleDelete = () => {
        console.log('delete')
        setSubmitType('delete')
    }

    return <AnimatePresence exitBeforeEnter={true}>
        {isOpen &&
            <Modal isOpen={isOpen} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Header>Edit {name}</Header>
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


                    {/* inStock */}
                    <Controller
                        defaultValue=''
                        name='img'
                        control={control}
                        rules={formVerifiers.required}
                        render={({ field }) => <Input label={'Link to the image'} {...field} />}
                    />
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

                    <Margin height={'10px'} />
                    <FlexRow flexDirection={'row-reverse'}>
                        <Button onClick={handleSave} disabled={isLoading}>Save</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                        {/* <Button onClick={onClose}>Cancel</Button> */}
                    </FlexRow>
                </form>
            </Modal>
        }
    </AnimatePresence>
}
