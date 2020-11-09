import { useEffect } from 'react';

import * as lodash from 'lodash';

import { MainLayout } from '../../components/main_layout/main_layout';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from 'react-redux';
import {
  getPostData,
  setFilterItems,
  setSearchUrl,
} from '../../store/reducers/blogPageReducer';

import BlogCardContainer from '../../components/blog_card/blog_card';
import { Pagination } from '../../components/pagination/Pagination';

import * as queryString from 'query-string';

import style from './blog.module.scss';
import FilterCheckBox from '../../components/filter_checkbox/filter_checkbox';

function Blog({ posts_with_cat, totalPages, categories, error }) {
  const router = useRouter();

  let currentPage = router.query ? router.query.page : 1;

  if (error) {
    return <div>something going wrong</div>;
  }

  const dispatch = useDispatch();
  const reduxUrl = useSelector((state) => state.blog.url);

  useEffect(() => {
    let url = router.query;

    let cleanUrl = lodash.mapValues(url, function (value, key) {
      if (key === 'slug') {
        delete url[key];
      } else {
        let arrayValue = value.split(',');
        let arrayValueNumber = arrayValue.map((value) => Number(value));
        return arrayValueNumber;
      }
    });
    dispatch(setFilterItems(categories));
    dispatch(setSearchUrl(cleanUrl));
  }, []);

  return (
    <MainLayout>
      <section className={style.page_wrapper}>
        <h2 className={style.page_title}>
          Блог с интересными статьями по веб-разработке
        </h2>
        <div className="container">
          <div className={style.filter_wrapper}>
            <div className={style.filter_item}>Категории</div>
            {categories.map((category) => {
              if (category.id === 1) {
                return '';
              } else {
                if (reduxUrl.category !== undefined) {
                  reduxUrl.category.map((categoryItem) => {
                    if (category.id === categoryItem) {
                      return (
                        <FilterCheckBox
                          key={category.id}
                          cat_id={category.id}
                          name={category.name}
                          isChecked={true}
                        />
                      );
                    } else {
                      return (
                        <FilterCheckBox
                          key={category.id}
                          cat_id={category.id}
                          name={category.name}
                          isChecked={false}
                        />
                      );
                    }
                  });
                } else {
                  return (
                    <FilterCheckBox
                      key={category.id}
                      cat_id={category.id}
                      name={category.name}
                      isChecked={false}
                    />
                  );
                }
              }
            })}
          </div>
          {/*  {blog_items.length > 0 ? (
            <BlogCardContainer posts={blog_items} />
          ) : (
            <BlogCardContainer posts={posts_with_cat} />
          )} */}
          <BlogCardContainer posts={posts_with_cat} />
          <Pagination
            slug={'blog'}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </MainLayout>
  );
}
export default Blog;

/* export async function getStaticProps(ctx) {

  try {
    const res = await fetch(
      `${process.env.api_key}/${ctx.params.slug}?per_page=3&page=${
        ctx.params.page ? ctx.params.page : 1
      }`
    );

    const posts = await res.json();
    const totalPages = await res.headers.get("X-WP-TotalPages");
    console.log(posts);
    return {
      props: {
        posts,
        totalPages,
      },
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
export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [{ params: { slug: "blog" } }, { params: { slug: "portfolio" } }],
  };
} */

/* export async function getServerSideProps(ctx) {
  try {
    const res = await fetch(
      `${process.env.api_key}/posts?per_page=3&page=${
        ctx.params.page ? ctx.params.page : 1
      }`
    );

    const posts = await res.json();
    const totalPages = await res.headers.get("X-WP-TotalPages");

    return {
      props: {
        posts,
        totalPages,
      },
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
 */
export async function getServerSideProps(ctx) {
  console.log(ctx);
  try {
    const res = await fetch(
      `${process.env.api_key}/posts?per_page=4&page=${
        ctx.query.page ? Number(ctx.query.page.replace(/page_/, '')) : 1
      }`
    );

    const posts = await res.json();
    const totalPages = await res.headers.get('X-WP-TotalPages');
    const categories_res = await fetch(`${process.env.api_key}/categories`);
    const categories = await categories_res.json();
    const posts_with_cat = await posts.map((post) => {
      categories.map((category) => {
        if (post.categories[0] === category.id) {
          post.categories[0] = category.name;
        }
      });
      return post;
    });

    return {
      props: {
        posts_with_cat,
        totalPages,
        categories,
      },
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
