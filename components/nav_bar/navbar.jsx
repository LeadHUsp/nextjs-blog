import Link from 'next/link';
import { useRouter } from 'next/router';

//icons import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBookOpen,
  faLaptopCode,
  faUserGraduate,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
//style
import style from './navbar.module.scss';

function LinkItem({ href, text, icon }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${style.nav_item} ${
          router.pathname === href || router.query.slug == href.substr(1)
            ? style.active
            : ''
        }`}
      >
        <span className={style.nav_item_text}>
          <span className={style.nav_item_icon}>
            <FontAwesomeIcon icon={icon} />
          </span>
          {text}
        </span>
      </a>
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav className={style.nav}>
      <LinkItem href="/" text="домой" icon={faHome} />
      <LinkItem href="/blog" text="блог" icon={faBookOpen} />
      <LinkItem href="/portfolio" text="портфолио" icon={faLaptopCode} />
      <LinkItem href="/about" text="о себе" icon={faUserGraduate} />
      <LinkItem href="/contact" text="контакты" icon={faEnvelopeOpenText} />
    </nav>
  );
}
