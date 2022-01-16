import React, { useState, useEffect } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "@src/modules";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { SessionContext, getCookie, setCookie } from "@utils/session";

import "@styles/App.css";

import Gnb from "@components/Gnb";
import Router from "@components/Router";

const middlewares = [logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const history = createBrowserHistory();

const App = (props: any) => {
  const [session, setSession] = useState(getCookie("session"));
  useEffect(() => {
    setCookie("session", getCookie("session"));
  }, [session]);

  return (
    <div className="App">
      <SessionContext.Provider value={session}>
        <BrowserRouter>
          <Provider store={store}>
            <Gnb />
            <Router />
          </Provider>
        </BrowserRouter>
      </SessionContext.Provider>
    </div>
  );
};

export default App;