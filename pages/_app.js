import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { wrapper, store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen justify-between">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
