import { MainLayout } from '../../components/main_layout/main_layout';

function SinglePost({ post }) {
  console.log(post);

  return (
    <MainLayout>
      <pre>{post[0].title.rendered}</pre>
    </MainLayout>
  );
}
export default SinglePost;

export async function getServerSideProps(ctx) {
  try {
    const res = await fetch(
      `${process.env.api_key}/posts?slug=${ctx.query.slug}`
    );
    const post = await res.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
