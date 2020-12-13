import { MainLayout } from '../../../components/main_layout/main_layout';

import style from './portfolio_work.module.scss';

function SinglePost({ post }) {
  /*  console.log(post); */

  return (
    <MainLayout
      title={post.acf ? post.acf.meta_title : null}
      meta_descr={post.acf ? post.acf.meta_descr : null}
      meta_keywords={post.acf ? post.acf.meta_keyw : null}
      menu_btn_color="#000"
    >
      <main className={style.content}>
        <div className={style.content__wrapper}>
          <div className={style.header}>
            <div className={style.header__img}>
              <img
                src={post.better_featured_image.source_url}
                alt={post.better_featured_image.alt_text}
              />
            </div>
            <div className={style.header__inner}>
              <h1 className={style['header__inner-title']}>
                {post.title.rendered}
              </h1>
              <div
                className={style['header__inner-text']}
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
export default SinglePost;

export async function getServerSideProps(ctx) {
  try {
    const res = await fetch(
      `${process.env.api_key}/posts?slug=${ctx.query.work_slug}`
    );
    const post = await res.json();

    return {
      props: {
        post: post[0],
      },
    };
  } catch (error) {
    console.log(error);
  }
}
