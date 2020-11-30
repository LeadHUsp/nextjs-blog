import style from './loader.module.scss';

export default function Loader() {
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
