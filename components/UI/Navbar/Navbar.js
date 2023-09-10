import Margin from "@/components/skeleton/Margin";
import Link from "next/link";
import s from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <nav className={s.container}>
        <ul>
          <li>
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </li>
          <li>
            <Link href="/bank">
              <a>Bank</a>
            </Link>
          </li>
          <li>
            <Link href="/business">
              <a>Business</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
      </nav>
      <Margin height={"40px"} />
    </div>
  );
}
