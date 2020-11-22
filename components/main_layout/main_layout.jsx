import Head from 'next/head';
import { useSelector } from 'react-redux';

import NavBar from '../nav_bar/navbar';
import Footer from '../footer/footer';
import ContactForm from '../contact_form_container/contact_form_container';

import { motion, AnimatePresence } from 'framer-motion';

import style from './main_layout.module.scss';

export function MainLayout({
  children,
  title = 'Next App',
  meta_descr = 'blog on Next js',
  meta_keywords = 'blog react next redux',
}) {
  const formAppearance = useSelector((state) => state.contact.is_open);
  return (
    <>
      <Head>
        <title>{title} </title>
        <meta name="description" content={meta_descr} />
        <meta name="keywords" content={meta_keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <aside className={style.aside}>
        <h1 className={style.title}>Personal site</h1>
        <NavBar />
        <Footer />
      </aside>

      <motion.main className={style.main}>
        {children}
        <AnimatePresence>{formAppearance && <ContactForm />}</AnimatePresence>
      </motion.main>
    </>
  );
}
