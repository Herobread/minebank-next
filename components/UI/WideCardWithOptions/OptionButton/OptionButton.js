import s from './OptionButton.module.css'

export default function OptionButton({ img, ...props }) {
    return <button className={s.button} {...props}>
        {img}
    </button>
}
