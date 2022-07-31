import s from './FileInput.module.css'

import View from '@/icons/view.svg'
import ViewClosed from '@/icons/closed.svg'

import { useState } from 'react'

export default function Input({ label, ...props }) {
    return <div>
        <input type={'file'} />
    </div>
}
