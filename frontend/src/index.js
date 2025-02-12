import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./service/redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="583658858550-mc1n9c3ha94v9n87ifut6kfdi4aanh2d.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
