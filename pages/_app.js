import NextNprogress from "nextjs-progressbar";

import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress
        color="#39054a"
        startPosition="0.5"
        stopDelayMs="200"
        height="3"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
