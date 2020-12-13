import { IconContext } from 'react-icons';
import { ImCheckmark } from 'react-icons/im';
import { BiError } from 'react-icons/bi';

import style from './form_message.module.scss';
export default function FormMessage({ actionClose, status }) {
  return (
    <div className={style.message}>
      <div className={style.message__icon}>
        {status === 'succes' ? (
          <div
            className={`${style.icon__container} ${style['icon__container-success']}`}
          >
            <IconContext.Provider
              value={{
                className: `${style.icon_success}`,
              }}
            >
              <ImCheckmark />
            </IconContext.Provider>
          </div>
        ) : (
          <div
            className={`${style.icon__container} ${style['icon__container-error']}`}
          >
            <IconContext.Provider
              value={{
                className: `${style.icon_error}`,
              }}
            >
              <BiError />
            </IconContext.Provider>
          </div>
        )}
      </div>

      <div className={style.message__text}>
        {status === 'succes'
          ? 'Сообщение успешно отправлено'
          : 'Произошла ошибка попробуйте позже'}
      </div>
      <button onClick={actionClose} className={style.btn__success}>
        Вернуться назад
      </button>
    </div>
  );
}
