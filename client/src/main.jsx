import React from "react";
import "./assets/css/font-awesome.min.css";
import ReactDOM from "react-dom/client";
import "./assets/css/bootstrap.min.css";
import App from "./App.jsx";
import "./assets/css/feathericon.min.css";
import "./assets/css/select2.min.css";
import "./assets/plugins/datatables/datatables.min.css";
import "./assets/css/style.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
   </React.StrictMode>
);
