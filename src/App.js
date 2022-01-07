import React, { useState, useEffect, useRef } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "~/modules/login/user";
import * as actionOfGlobal from "~/modules/global/actionOfGlobal";
import axiosConfig from "~/utils/axiosConfig";
import { isEmpty, SynchroniseSession } from "~/utils/valid";

import Signup from "~/pages/login/Signup";
import Login from "~/pages/login/Login";
import SsoLogin from "~/pages/login/SsoLogin";
import Gnb from "~/components/Gnb";
import Main from "~/components/Main";
import UserList from "~/pages/settings/users/UserList";
import AddUser from "~/pages/settings/users/AddUser";
import EditUser from "~/pages/settings/users/EditUser";
import RoleList from "~/pages/settings/roles/RoleList";
import EditRole from "~/pages/settings/roles/EditRole";
import UserProfile from "~/pages/settings/users/UserProfile";
import EditUserProfile from "~/pages/settings/users/EditUserProfile";

import Bookclub from "~/pages/bookclub/Bookclub";

const App = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const storedLoginInfo = useSelector((state) => state.user.loginInfo); //redux store
  useEffect(() => {
    // session check
    // 1. get session info
    // let browserLoginInfo = {};
    // if (global.localStorage) {
    //   // Browser Local storage
    //   browserLoginInfo =
    //     JSON.parse(global.localStorage.getItem("loginInfo")) || {};
    //   if (Object.keys(storedLoginInfo).length === 0) {
    //     // redux store
    //     dispatch(actions.setLoginInfo(browserLoginInfo));
    //   } else {
    //     if (storedLoginInfo.token.length === 0) {
    //       axiosConfig.get("/logout")
    //         .then(function (response) {
    //           // success
    //           dispatch(actions.setLoginInfo({})); // initiate redux store
    //           global.localStorage.removeItem("loginInfo"); // remove localstorage item by key
    //           global.localStorage.clear(); // clear localstorage
    //           history.push("/login");
    //         })
    //         .catch(function (error) {
    //           // error
    //         })
    //         .then(function () {
    //           // finally
    //         });
    //     }
    //   }
    // }
    // // 2. Check the request token
    // let token = browserLoginInfo.token;
    // if (isEmpty(token)) {
    //   history.push("/login");
    //   axiosConfig.defaults.headers["x-auth-token"] = "";
    // } else {
    //   axiosConfig.defaults.headers["x-auth-token"] = token;
    // }
  }, []);

  useEffect(() => {
    function onKeyup(e) {
      if (e.key === "Escape") {
        dispatch(actionOfGlobal.setGnbMode("show"));
      }
    }
    window.addEventListener("keyup", onKeyup);
  });

  return (
    <div className="App">
      <Gnb />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact strict path="/login" component={Login} />
        <Route path="/users/list" component={UserList} />
        <Route path="/users/add" component={AddUser} />
        <Route path="/users/edit/:userId" component={EditUser} />
        <Route path="/roles/list" component={RoleList} />
        <Route path="/roles/edit/:role" component={EditRole} />
        <Route path="/users/profile/userinfo" component={UserProfile} />
        <Route path="/users/profile/edit" component={EditUserProfile} />
        <Route path="/signup" component={Signup} />
        <Route path="/bookclub/list" component={Bookclub} />
      </Switch>
    </div>
  );
};

export default App;
