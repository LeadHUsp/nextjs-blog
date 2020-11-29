import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import style from './loader.module.scss';

export default function Loader() {
  /*  const show = useSelector((state) => state.loader.is_show);
  useEffect(() => {
    console.log(show);
  }, [show]); */

  return (
    <div className={style.loader}>
      <div className={style['loader__container']}>
        <div className={style['loader__content']}>
          <div
            className={`${style['loader__content-inner']} ${style['loader__content-one']}`}
          ></div>
          <div
            className={`${style['loader__content-inner']} ${style['loader__content-two']}`}
          ></div>
          <div
            className={`${style['loader__content-inner']} ${style['loader__content-three']}`}
          ></div>
        </div>
        <div className={style['loader__content-text']}>
          Пожалуйста подождите...
        </div>
      </div>
    </div>
  );
}
