import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "~/modules/index";
import * as actions from "~/modules/bookclub/actionOfBookclub";
import axiosConfig from "~/utils/axiosConfig";
import { isNotEmpty, isEmpty, checkValidToken } from "~/utils/valid";

const Bookclub = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [variable1, setVariable1] = useState("This is initial text");

  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getBookclubList();
  }, []);

  const getBookclubList = (keyword) => {
    axiosConfig.get("/api/v1/bookclub/list", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response) {
        // success
        setVariable1(response.data);
      })
      .catch(function (error) {
        // error
      })
      .then(function () {
        // finally
      });
  };
  return (
    <div>
    </div>
  );
};

export default Bookclub;
