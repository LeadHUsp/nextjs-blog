import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';

//icons import
import { IconContext } from 'react-icons';
import { AiOutlineHome } from 'react-icons/ai';
import { RiCodeSSlashLine, RiUser3Line } from 'react-icons/ri';
//style
import style from './navbar.module.scss';

function LinkItem({ href, text, icon }) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setDisabled(true);
  });
  Router.events.on('routeChangeComplete', () => setDisabled(false));
  Router.events.on('routeChangeError', () => setDisabled(false));

  return (
    <Link href={href}>
      <a
        className={`${style.nav_item} ${
          router.pathname == href || router.query.slug == href.substr(1)
            ? style.active
            : ''
        }`}
        style={{ pointerEvents: `${disabled ? 'none' : 'auto'}` }}
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
