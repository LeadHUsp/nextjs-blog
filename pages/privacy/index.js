import { MainLayout } from '../../components/main_layout/main_layout';
import style from './privacy.module.scss';

function Contact({ page, error }) {
  console.log(page);
  if (error) {
    return <Custom404 />;
  }
  return (
    <MainLayout
      title={page.acf.meta_title}
      meta_descr={page.acf.meta_descr}
      meta_keywords={page.acf.meta_keyw}
      menu_btn_color="#000"
    >
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      ></div>
    </MainLayout>
  );
}
export default Contact;
export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.api_key}/pages/3`);
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
