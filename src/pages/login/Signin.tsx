import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axiosConfig from "@utils/axiosConfig";
import * as session from "@utils/session";

import "@styles/App.css";
import "@styles/signin.css";

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
        <div className="text-center" style={{display: "flex",alignItems: "center",paddingTop: "40px",paddingBottom: "40px",backgroundColor: "#ffffff",
                                             height: intFrameHeight,margin: "0",}}>
            <main className="form-signin" style={{width: "100%",maxWidth: "430px",padding: "15px",margin: "auto",display: "block",}}>
                <img className="mb-4" src="/images/login/asterik.png" alt="" width="72" height="72"/>
                <div className="card border-0">
                    <h1 className="h1 mb-3 fw-bold">Read with us</h1>
                    <article className="card-body">
                        <form>
                            <div className="form-group">
                                <input name="" className="form-control form-control-lg" placeholder="이메일을 입력하세요" type="email"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" placeholder="비밀번호를 입력하세요" type="password"/>
                            </div>
                            <div className="form-group">
                                <div className="checkbox" style={{float:"left"}}>
                                    <input type="checkbox"/><label style={{verticalAlign:"1.5px"}}>&nbsp;자동 로그인</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-lg btn-info w-100"
                                        style={{ backgroundColor: '#00BAA4', color: "white", fontSize: "110%"}}
                                        onClick={goLogin} ref={loginSubmit}>
                                    로그인
                                </button>
                            </div>
                            <div className="form-group">
                                <Link to="/signup" className="btn btn-lg btn-outline-secondary w-100" style={{fontSize: "110%"}}>회원가입</Link>
                            </div>
                            <a className="float-right" style={{color:"#888", textDecoration: "none"}}>비밀번호를 잊어버리셨나요?</a>
                        </form>
                    </article>
                </div>
            </main>
        </div>
    );
};

export default Login;
