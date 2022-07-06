import s from './OptionButton.module.css'

export default function OptionButton({ img, onClick }) {
    return <button className={s.button}>
        {img}
    </button>
}
