import Link from "next/link";
import { useRouter } from "next/router";
import style from "./navbar.module.scss";

function LinkItem({ href, text }) {
  const router = useRouter();

  return (
    <Link href={href} as="">
      <a
        className={`${style.nav_item} ${
          router.pathname === href ? style.active : ""
        }`}
      >
        {text}
      </a>
    </Link>
  );
}

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className={style.nav}>
      <LinkItem href="/" text="home" />
      <LinkItem href="/blog" text="blog" />
      <LinkItem href="/portfolio" text="portfolio" />
      <LinkItem href="/about" text="about" />
      <LinkItem href="/contact" text="contact" />
    </nav>
  );
}
