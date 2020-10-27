import Link from "next/link";

import { MainLayout } from "../components/main_layout/main_layout";

export default function Home() {
  return (
    <MainLayout title="Home Page" meta_descr="home page">
      <h1>App home page</h1>
      <div>
        <Link href="/about">
          <a>about</a>
        </Link>
      </div>
      <div>
        <Link href="/posts">
          <a>posts</a>
        </Link>
      </div>
    </MainLayout>
  );
}
