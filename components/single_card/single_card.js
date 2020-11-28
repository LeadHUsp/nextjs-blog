import Link from 'next/link';

import { useState, useRef, useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';

import { useInView } from 'react-intersection-observer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import style from './single_card.module.scss';

function PortfolioCard({ animateControl, index, post }) {
  const [isHovered, setHovered] = useState(false);

  let windowWidth;
  typeof window !== 'undefined' ? (windowWidth = window.innerWidth) : null;

  const cardEl = useRef(null);

  const controlCircle = useAnimation();
  const responsiveCardControl = useAnimation();
  const onMouseEnterHandler = (e) => {
    let elem = cardEl.current.getBoundingClientRect();
    let x = e.pageX - (elem.left + pageXOffset);
    let y = e.pageY - (elem.top + pageYOffset);

    controlCircle.set({ top: y, left: x });
    controlCircle.start({
      top: y,
      left: x,
      x: '-50%',
      y: '-50%',
      opacity: 1,
      width: 1300,
      height: 1300,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    });
    setHovered(true);
  };
  const onMouseLeaveHeandler = (e) => {
    let elem = cardEl.current.getBoundingClientRect();
    let x = e.pageX - (elem.left + pageXOffset);
    let y = e.pageY - (elem.top + pageYOffset);

    controlCircle.start({
      opacity: 1,
      width: 0,
      height: 0,
      top: y,
      left: x,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    });

    setHovered(false);
  };

  const linkVariants = {
    visible: {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: 'easeIn',
      },
    },
    hidden: {
      opacity: 0,
      visibility: 'hidden',
      y: '30%',
    },
  };
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  useEffect(() => {
    if (inView && windowWidth <= 600) {
      responsiveCardControl.start({
        opacity: 1,
        x: 0,
        transition: { ease: 'easeOut', duration: 1 },
      });
    }
  }, [inView]);
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={windowWidth > 600 ? animateControl : responsiveCardControl}
      custom={windowWidth > 600 && index}
      className={style.blog_card}
      onClick={onMouseEnterHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHeandler}
      ref={cardEl}
    >
      <motion.div
        initial="hidden"
        animate={controlCircle}
        className={style.card_layer}
      ></motion.div>
      <motion.div
        initial="hidden"
        animate={isHovered ? 'visible' : 'hidden'}
        className={style.link_wrapper}
        variants={linkVariants}
      >
        <Link href={`/single_post/${post.slug}`}>
          <a className={`${style.card_layer_link}`}>
            Подробнее <FontAwesomeIcon icon={faLongArrowAltRight} />
          </a>
        </Link>
      </motion.div>

      <div className={style.card_img} ref={ref}>
        <img src={post.better_featured_image.source_url} alt="" />
        <div className={style.card_icon}>
          <FontAwesomeIcon icon={faHandPointUp} />
          &nbsp;Наведите, чтобы узнать подробнее
        </div>
      </div>

      <div className={style.card_descr}>
        <div className={style.card_title}>{post.title.rendered}</div>
        <div className={style.card_category}>
          Категория: {post.categories[0]}
        </div>
        <div className={style.card_announcement}>{post.acf.announcement}</div>

        <Link href={`/single_post/${post.slug}`}>
          <a className={`${style.link_readmore} ${style.card_link}`}>
            Подробнее
          </a>
        </Link>
      </div>
    </motion.div>
  );
}

function PortfolioCardContainer({ posts }) {
  let windowWidth;
  typeof window !== 'undefined' ? (windowWidth = window.innerWidth) : null;
  const { ref, inView, entry } = useInView({ triggerOnce: true });
  const controlBlogItem = useAnimation();
  useEffect(() => {
    if (inView && windowWidth > 600) {
      controlBlogItem.start((i) => ({
        opacity: 1,
        x: 0,
        transition: { ease: 'easeOut', duration: 1, delay: i * 0.5 },
      }));
    }
  }, [posts, inView]);

  return (
    <div className={style.card_list} ref={ref}>
      {posts.map((post, index) => {
        return (
          <PortfolioCard
            animateControl={controlBlogItem}
            index={index}
            post={post}
            key={post.id}
          />
        );
      })}
    </div>
  );
}

export default PortfolioCardContainer;
