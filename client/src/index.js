import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";


const clientId =
  "873071050735-9l15nj9092mmk84tik88usu8avd4mgjj.apps.googleusercontent.com";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </>,
);
