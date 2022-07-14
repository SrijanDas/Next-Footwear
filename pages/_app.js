import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { useStore } from "../store";
import { Provider } from "react-redux";
import Layout from "../layout";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout title="NFootwear">
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
