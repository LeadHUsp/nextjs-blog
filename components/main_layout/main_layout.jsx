import Head from 'next/head';
import { useSelector } from 'react-redux';

import NavBar from '../nav_bar/navbar';
import Footer from '../footer/footer';
import ContactForm from '../contact_form_container/contact_form_container';

import { motion, AnimatePresence } from 'framer-motion';
import { IconContext } from 'react-icons';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';

import style from './main_layout.module.scss';
import { useState } from 'react';

export function MainLayout({
  children,
  title = 'Next App',
  meta_descr = 'blog on Next js',
  meta_keywords = 'blog react next redux',
}) {
  const formAppearance = useSelector((state) => state.contact.is_open);
  const [menuShow, setMenuShow] = useState(false);

  return (
    <>
      <Head>
        <title>{title} </title>
        <meta name="description" content={meta_descr} />
        <meta name="keywords" content={meta_keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <aside className={`${style.aside} ${menuShow && style['aside-show']}`}>
        <button
          className={style['menu__btn-close']}
          onClick={() => {
            setMenuShow(false);
          }}
        >
          <IconContext.Provider value={{ size: 50 }}>
            <VscChromeClose />
          </IconContext.Provider>{' '}
        </button>
        <h1 className={style.title}>Personal site</h1>
        <NavBar />
        <Footer />
      </aside>

      <motion.main className={style.main}>
        <button
          className={style['menu__btn-show']}
          onClick={() => {
            setMenuShow(true);
          }}
        >
          <IconContext.Provider value={{ size: 50, color: '#fff' }}>
            <HiOutlineMenuAlt2 />
          </IconContext.Provider>{' '}
        </button>
        {children}
        <AnimatePresence>{formAppearance && <ContactForm />}</AnimatePresence>
      </motion.main>
    </>
  );
}
