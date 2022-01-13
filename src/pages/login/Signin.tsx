import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import * as session from "@utils/session";
import * as actions from "@modules/user/session";

const Login = (props: any) => {
  const dispatch = useDispatch();
  let intFrameHeight = window.innerHeight - 56;
  const navigate = useNavigate();

  const loginUserName = useRef<HTMLInputElement>(null);
  const loginUserPassword = useRef<HTMLInputElement>(null);
  const loginSubmit = useRef<HTMLButtonElement>(null);

  const goLogin = () => {
    //test
    let sample = {
      loginId: "sample",
      token: "1234-5678"
    }
    session.setCookie("session", JSON.stringify(sample));
    console.log(session.getCookie("session"));
    navigate("/");

    // axiosConfig
    //   .post("/login", {
    //     username: loginUserName.current.value,
    //     password: loginUserPassword.current.value,
    //   })
    //   .then(function (response) {
    //     // success
    //     //TODO: set LoginUser Info & go to Main page
    //     let loginInfo = {};
    //     loginInfo.loginId = response.data.username;
    //     loginInfo.firstName = response.data.firstName;
    //     loginInfo.lastName = response.data.lastName;
    //     loginInfo.tel = response.data.tel;
    //     loginInfo.email = response.data.email;
    //     loginInfo.address1 = response.data.address1;
    //     loginInfo.address2 = response.data.address2;
    //     loginInfo.token = response.data.token;
    //     loginInfo.authorities = response.data.authorities;
    //     loginInfo.isActive = response.data.isActive;
    //     const now = new Date();
    //     loginInfo.loginTime = now.getTime;//unit: milli second (typeof number)
    //     loginInfo.lastAccessTime = now.getTime;//unit: milli second (typeof number)

    //     // redux store
    //     dispatch(actions.setLoginInfo(loginInfo));

    //     // browser Local storage
    //     global.localStorage.setItem(
    //       "loginInfo",
    //       JSON.stringify({
    //         loginId: loginInfo.loginId,
    //         firstName: loginInfo.firstName,
    //         lastName: loginInfo.lastName,
    //         tel: loginInfo.tel,
    //         email: loginInfo.email,
    //         address1: loginInfo.address1,
    //         address2: loginInfo.address2,
    //         token: loginInfo.token,
    //         authorities: loginInfo.authorities,
    //         isActive: loginInfo.isActive,
    //         loginTime: loginInfo.loginTime,
    //         lastAccessTime: loginInfo.lastAccessTime,
    //       })
    //     );
    //     axiosConfig.defaults.headers["x-auth-token"] = response.data.token;

    //     history.push("/");
    //   })
    //   .catch(function (error) {
    //     // error
    //   })
    //   .then(function () {
    //     // finally
    //   });
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      loginSubmit.current?.click();
    }
  };
  return (
    <div
      className="text-center"
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: "40px",
        paddingBottom: "40px",
        backgroundColor: "#f5f5f5",
        height: intFrameHeight,
        margin: "0",
      }}
    >
      <main
        className="form-signin"
        style={{
          width: "100%",
          maxWidth: "330px",
          padding: "15px",
          margin: "auto",
          display: "block",
        }}
      >
        <form>
          <img
            className="mb-4"
            src="/images/login/asterik.png"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="User name"
              ref={loginUserName}
            />
            <label htmlFor="floatingInput">USER NAME</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={loginUserPassword}
              onKeyPress={handleKeyPress}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div> */}
          <button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            onClick={goLogin}
            ref={loginSubmit}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">© 2022</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
