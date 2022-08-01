import s from './FileInput.module.css'

import View from '@/icons/view.svg'
import ViewClosed from '@/icons/closed.svg'

import { useState } from 'react'
import { useController } from 'react-hook-form';

export default function Input({ control, name, label, ...props }) {
    const { field } = useController({ control, name });
    const [value, setValue] = useState('');

    return <>
        <label className={s.label}>
            {label}
        </label>
        <br />
        <input
            type='file'
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
                field.onChange(e.target.files);
            }}
        />
    </>
}
