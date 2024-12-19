import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "./redux/store";
import ModalProvider from "./components/context/ModalProvider";
import { GG_CLIENT_ID } from "./utils/constants";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </GoogleOAuthProvider>
  </>,
);
