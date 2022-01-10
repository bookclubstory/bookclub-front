import axiosConfig from "~/utils/axiosConfig";

export const isEmpty = (str) => {
  if (typeof str === "undefined" || str === null || str === "") return true;
  else return false;
};

export const isNotEmpty = (str) => {
  if (typeof str === "undefined" || str === null || str === "") return false;
  else return true;
};

export const checkValidToken = () => {
  // 1. get session info
  let browserLoginInfo = {};
  if (global.localStorage) {
    // Browser Local storage
    browserLoginInfo =
      JSON.parse(global.localStorage.getItem("loginInfo")) || {};
  }
  // 2. Check the request token
  let token = browserLoginInfo.token;
  if (isEmpty(token)) {
    axiosConfig.defaults.headers["x-auth-token"] = "";
  } else {
    axiosConfig.defaults.headers["x-auth-token"] = token;
  }
};
