import { MainLayout } from "../../components/main_layout/main_layout";
import { useRouter } from "next/router";
import { Pagination } from "../../components/pagination/Pagination";
import style from "../blog/blog.module.scss";

function Portfolio({ posts, totalPages }) {
  const router = useRouter();
  let currentPage = router.query ? router.query.page : 1;

  return (
    <MainLayout>
      <h1>blog page</h1>
      <div className={style.post_wrapper}>
        {posts.map((post) => {
          return (
            <div className={style.post} key={post.id}>
              <div>{post.title.rendered}</div>
              <div>{post.content.rendered} </div>
            </div>
          );
        })}
      </div>
      <Pagination
        slug={"portfolio"}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </MainLayout>
  );
}
export default Portfolio;

export async function getServerSideProps(ctx) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://react-base.000webhostapp.com/wp-json/wp/v2/posts?per_page=3&page=${
      ctx.params ? ctx.params.page : 1
    }`
  );
  const posts = await res.json();
  const totalPages = await res.headers.get("X-WP-TotalPages");

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      totalPages,
    },
  };
}
