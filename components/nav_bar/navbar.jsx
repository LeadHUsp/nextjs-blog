import Link from 'next/link';
import { useRouter } from 'next/router';

//icons import
import { IconContext } from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { RiCodeSSlashLine, RiUser3Line } from 'react-icons/ri';
//style
import style from './navbar.module.scss';

function LinkItem({ href, text, icon }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${style.nav_item} ${
          router.pathname == href || router.query.slug == href.substr(1)
            ? style.active
            : ''
        }`}
      >
        <span className={style.nav_item_text}>
          <IconContext.Provider value={{ className: `${style.nav_item_icon}` }}>
            {icon}
          </IconContext.Provider>

          {text}
        </span>
      </a>
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav className={style.nav}>
      <LinkItem href="/" text="домой" icon={<AiOutlineHome />} />
      <LinkItem
        href="/portfolio"
        text="портфолио"
        icon={<RiCodeSSlashLine />}
      />
      <LinkItem href="/about" text="обо мне" icon={<RiUser3Line />} />
    </nav>
  );
}
