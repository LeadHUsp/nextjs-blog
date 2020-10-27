import Head from "next/head";
import NavBar from "../nav_bar/navbar";

import style from "./main_layout.module.scss";

export function MainLayout({
  children,
  title = "Next App",
  meta_descr = "blog on Next js",
  meta_keywords = "blog react next redux",
  nav_items,
}) {
  return (
    <>
      <Head>
        <title>{title} | Next JS</title>
        <meta name="description" content={meta_descr} />
        <meta name="keywords" content={meta_keywords} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <aside className={style.aside}>
        <h1 className={style.title}>Personal site</h1>
        <NavBar />
        <div className={style.footer}>will be a footer with social links</div>
      </aside>
      <main className={style.main}>{children}</main>
    </>
  );
}
