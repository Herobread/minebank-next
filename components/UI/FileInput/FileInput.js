import s from './FileInput.module.css'

import View from '@/icons/view.svg'
import ViewClosed from '@/icons/closed.svg'

import { useEffect, useState } from 'react'
import { useController } from 'react-hook-form';
import ProfilePicture from '../ProfilePicture';
import Image from 'next/image';

export default function Input({ control, name, label, initialImg, ...props }) {
    const { field } = useController({ control, name })
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {

        if (initialImg) {
            setImgUrl(initialImg)
        } else if (img) {
            setImgUrl(URL.createObjectURL(img[0]))
        }

        return () => { }
    }, [initialImg, img])



    return <>
        <label className={s.label}>
            {label}
            <br />
            <div className={s.inputContainer}>
                {
                    imgUrl &&
                    <div className={s.imgContainer}>
                        <Image
                            height={50}
                            width={50}
                            src={imgUrl}
                        />
                    </div>
                }
                <input
                    className={s.input}
                    type='file'
                    img={img}
                    onChange={(e) => {
                        setImg(e.target.files);
                        field.onChange(e.target.files);
                    }}
                />
            </div>
        </label>
    </>
}
