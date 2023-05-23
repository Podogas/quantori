import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx"
import { store } from "./store/store";
import ProtvistaUniprot from 'protvista-uniprot';

window.customElements.define(`protvista-uniprot`, ProtvistaUniprot);
ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
)
