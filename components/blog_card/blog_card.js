import Link from 'next/link';

import { useState, useRef, useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';

import { InView, useInView } from 'react-intersection-observer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHandPointUp } from '@fortawesome/free-regular-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import style from './blog_card.module.scss';

function BlogCard({ animateControl, index, post }) {
  const [isHovered, setHovered] = useState(false);
  const [direction, setDirection] = useState({ x: 0, left: 0 });
  const cardEl = useRef(null);

  const onMouseEnterHandler = (e) => {
    setHovered(true);
    let elem = cardEl.current.getBoundingClientRect();
    let x = e.pageX - (elem.left + pageXOffset);
    let y = e.pageY - (elem.top + pageYOffset);
    setDirection({ top: y, left: x });
    y = -(y / 2);
    x = -(x / 2);
  };
  const onMouseLeaveHeandler = (e) => {
    setHovered(false);
    let elem = cardEl.current.getBoundingClientRect();
    let x = e.pageX - (elem.left + pageXOffset);
    let y = e.pageY - (elem.top + pageYOffset);
    setDirection({ top: y, left: x });
    y = -(y / 2);
    x = -(x / 2);
  };

  const variants = {
    visible: {
      top: direction.top,
      left: direction.left,
      x: '-50%',
      y: '-50%',
      opacity: 1,
      width: 1300,
      height: 1300,
      transition: {
        duration: 0.5,
        ease: 'easeIn',
      },
    },
    hidden: {
      opacity: 1,
      width: 0,
      height: 0,
      top: direction.top,
      left: direction.left,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const linkVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: 'easeIn',
      },
    },
    hidden: {
      opacity: 0,
      y: '30%',
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={animateControl}
      custom={index}
      className={style.blog_card}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHeandler}
      ref={cardEl}
    >
      <motion.div
        initial="hidden"
        animate={isHovered ? 'visible' : 'hidden'}
        variants={variants}
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

      <div className={style.card_img}>
        <img src="/img/img-1.jpg" alt="" />
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

function BlogCardContainer({ posts }) {
  const { ref, inView, entry } = useInView({ triggerOnce: true });
  const controlBlogItem = useAnimation();
  useEffect(() => {
    if (inView) {
      controlBlogItem.start((i) => ({
        opacity: 1,
        x: 0,
        transition: { ease: 'easeOut', duration: 1, delay: i * 0.5 },
      }));
    }
  }, [posts, inView]);

  return (
    <div className={style.blog_list} ref={ref}>
      {posts.map((post, index) => {
        return (
          <BlogCard
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

export default BlogCardContainer;
