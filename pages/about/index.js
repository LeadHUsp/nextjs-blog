import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { VscDesktopDownload } from 'react-icons/vsc';
import Custom404 from '../404';

import { MainLayout } from '../../components/main_layout/main_layout';
import style from './about.module.scss';

function About({ page, error }) {
    if (error) {
        return <Custom404 />;
    }
    return (
        <MainLayout
            title={page.acf.meta_title}
            meta_descr={page.acf.meta_descr}
            meta_keywords={page.acf.meta_keyw}
            menu_btn_color="#000">
            <article className={style.about}>
                <div className="container">
                    <div className={style.page_intro}>
                        {/*   <div className={style.intro_photo}>
              <img src="img/img-1.jpg" alt="" />
            </div> */}
                        <div className={style.intro_text}>
                            <h2 className={style.intro_title}>Обо мне</h2>

                            <motion.div
                                animate={{ scale: 1, rotateY: 0 }}
                                initial={{ scale: 0.4, rotateY: 180 }}
                                transition={{ ease: 'easeOut', duration: 1 }}
                                className={style.intro_information}>
                                <span
                                    className={`${style.border} ${style.border_top_left}`}></span>
                                <span
                                    className={`${style.border} ${style.border_top_right}`}></span>
                                <span
                                    className={`${style.border} ${style.border_bottom_left}`}></span>
                                <span
                                    className={`${style.border} ${style.border_bottom_right}`}></span>
                                <ul>
                                    {page.acf.item.map((item) => (
                                        <li key={item.text}>{item.text}</li>
                                    ))}
                                </ul>
                                <button className="download">
                                    Скачать резюме
                                    <IconContext.Provider
                                        value={{
                                            size: '16px',
                                            className: `${style.icon_download}`,
                                        }}>
                                        <VscDesktopDownload />
                                    </IconContext.Provider>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </article>
        </MainLayout>
    );
}
export default About;

export async function getStaticProps() {
    try {
        const res = await fetch(`${process.env.api_key}/pages/125`);
        const page = await res.json();
        if (page.data !== undefined && page.data.status == '404') {
            return {
                props: {
                    error: true,
                },
            };
        } else {
            return {
                props: {
                    page,
                },
                revalidate: 1,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: true,
            },
        };
    }
}
