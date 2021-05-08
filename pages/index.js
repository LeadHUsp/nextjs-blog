import { useEffect } from 'react';
import SwiperCore, { Pagination, EffectFade, Autoplay, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3, faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Custom404 from './404';

/* components */
import { MainLayout } from '../components/main_layout/main_layout';
import PortfolioCardContainer from '../components/single_card/single_card';
/* styles */
import style from './home_page.module.scss';

function Home({ page, posts_with_cat, error }) {
    if (error) {
        return <Custom404 />;
    }

    SwiperCore.use([EffectFade, Pagination, Autoplay]);
    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 200 },
    };
    const initial = { opacity: 0, x: -50 };

    const controls = useAnimation();

    const [ref, inView] = useInView({ triggerOnce: true });

    const technology = [
        {
            title: 'html5',
            descr:
                'Что такое HTML – это язык разметки документов. Он применяется во всем мире. Браузер интерпретирует код HTML для отображения его на компьютере, планшете или телефоне.',
            icon: faHtml5,
            color: '#ff922b',
        },
        {
            title: 'css3',
            descr:
                'Каскадные таблицы стилей (Cascading Style Sheets = CSS) — это язык, который отвечает за визуальное представление документов пользователю. Под документом мы будем понимать набор информации о структуре страницы, описываемый языком разметки.',
            icon: faCss3,
            color: '#0277BD',
        },
        {
            title: 'javascript',
            descr:
                'JavaScript — мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией стандарта ECMAScript.',
            icon: faJsSquare,
            color: '#FFD600',
        },
        {
            title: 'react js',
            descr:
                'React — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных        разработчиков и корпораций.',
            icon: faReact,
            color: '#80DEEA',
        },
    ];
    const ItemTrigger = (inView) => {
        if (inView) {
            controls.start((i) => ({
                opacity: 1,
                x: 0,
                transition: { ease: 'easeOut', duration: 1, delay: i * 0.5 },
            }));
        } /* else {
      controls.start(() => ({
        opacity: 0,
        x: -50,
        transition: { ease: 'easeInOut' },
      }));
    } */
    };

    useEffect(() => {
        ItemTrigger(inView);
        /*   console.log(inView); */
    }, [controls, inView]);

    return (
        <MainLayout
            title={page.meta_title}
            meta_descr={page.meta_descr}
            meta_keywords={page.meta_keyw}>
            <div className={style.slider_wrapper}>
                <Swiper
                    autoplay={{ delay: 5000 }}
                    loop
                    effect="fade"
                    pagination={{
                        clickable: true,
                        el: `.${style.pagination_wrapper}`,
                        bulletClass: `${style.bullet}`,
                        bulletActiveClass: `${style.bullet_active}`,
                        bulletElement: 'li',
                        modifierClass: '',
                    }}>
                    {page.gallery.map((item, index) => {
                        return (
                            <SwiperSlide key={item.image}>
                                {({ isActive }) => (
                                    <div
                                        className={style.slide}
                                        style={{
                                            background: `center / cover no-repeat url(${item.image})`,
                                        }}>
                                        <motion.div
                                            initial="hidden"
                                            animate={isActive ? 'visible' : 'hidden'}
                                            variants={variants}
                                            transition={{ ease: 'easeOut', duration: 1 }}
                                            className={style.slide_title}>
                                            {item.title}
                                        </motion.div>
                                        <motion.div
                                            initial="hidden"
                                            animate={isActive ? 'visible' : 'hidden'}
                                            variants={variants}
                                            transition={{
                                                ease: 'easeOut',
                                                duration: 0.5,
                                                delay: 0.5,
                                            }}
                                            className={style.slide_text}>
                                            {item.text}
                                        </motion.div>
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                    <motion.ul
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ease: 'easeOut', duration: 1, delay: 1 }}
                        className={style.pagination_wrapper}></motion.ul>
                </Swiper>
            </div>

            <section className={style.technology}>
                <div className="container">
                    <h2>Коротко о технологиях</h2>
                    <div className={style.technology_list} ref={ref}>
                        {technology.map((item, index) => {
                            return (
                                <motion.div
                                    key={index * 2}
                                    className={style.technology_item}
                                    initial={initial}
                                    animate={controls}
                                    custom={index}>
                                    <div
                                        className={style.technology_icon}
                                        style={{ color: `${item.color}` }}>
                                        <FontAwesomeIcon icon={item.icon} />
                                    </div>
                                    <div className={style.technology_descr}>
                                        <div className={style.technology_title}>
                                            {item.title}
                                        </div>
                                        <div className={style.technology_text}>
                                            {item.descr}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className={style.blog}>
                <div className="container">
                    <h2>Последние работы в портфолио</h2>
                    <PortfolioCardContainer posts={posts_with_cat} slug="portfolio" />
                </div>
            </section>
        </MainLayout>
    );
}

export default Home;
export async function getStaticProps() {
    try {
        const res = await fetch(`${process.env.api_key}/pages/38`);
        if (res.status === 401 || res.status === 404) {
            return {
                props: {
                    error: true,
                },
            };
        }
        const page = await res.json();
        const blog = await fetch(`${process.env.api_key}/posts?per_page=4`);
        const posts = await blog.json();
        const categories = await fetch(`${process.env.api_key}/categories`);
        const cat = await categories.json();
        const posts_with_cat = await posts.map((post) => {
            cat.map((category) => {
                if (post.categories[0] === category.id) {
                    post.categories[0] = category.name;
                }
            });
            return post;
        });
        return {
            props: {
                page: page.acf,
                posts_with_cat,
            },
            revalidate: 1,
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}
