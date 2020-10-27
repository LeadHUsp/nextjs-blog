import Blog, { getStaticProps } from "./";

export default Blog;
export { getStaticProps };

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [{ params: { page: "1" } }],
  };
}
