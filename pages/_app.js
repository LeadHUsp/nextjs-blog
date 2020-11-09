import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
/* import { createWrapper } from 'next-redux-wrapper'; */
import { useStore } from '../store/store';

import store from '../store/store';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <NextNprogress
        color="#39054a"
        startPosition="0.5"
        stopDelayMs="200"
        height="3"
      />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
