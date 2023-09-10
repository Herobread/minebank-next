import s from "./ContentWrapper.module.css";

export default function ContentWrapper({ children }) {
  return <div className={s.container}>{children}</div>;
}
