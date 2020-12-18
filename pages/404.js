import { MainLayout } from '../components/main_layout/main_layout';
import style from './404.module.scss';

export default function Custom404() {
  return (
    <MainLayout menu_btn_color="#000">
      <section className={style.wrapper}>
        <div className={style.error_message}>Ошибка 404</div>
        <div className={style.error_text}>Страница не найдена</div>
      </section>
    </MainLayout>
  );
}
