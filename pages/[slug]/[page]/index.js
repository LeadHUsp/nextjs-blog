import Blog from '../';
import { getServerSideProps } from '../';

export default Blog;
export { getServerSideProps };
/* export async function getServerSideProps(ctx) {
  try {
    const url = `${process.env.api_key}/posts?per_page=4&page=${
      ctx.query.page ? ctx.query.page : 1
    }`;
    const res = await fetch(url);

    const posts = await res.json();
    const totalPages = await res.headers.get('X-WP-TotalPages');
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
        posts_with_cat,
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
} */
/* ctx.query.page ? Number(ctx.query.page.replace(/page_/, '')) : 1 */
