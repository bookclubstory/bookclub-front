import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "@modules/index";
import * as actions from "@modules/bookclub/actionOfBookclub";
import axiosConfig from "@utils/axiosConfig";
import { isNotEmpty, isEmpty } from "@utils/valid";

interface variable1 {
  variable1: string
}
const Bookclub = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [variable1, setVariable1] = useState<variable1>();

  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getBookclubList("");
  }, []);

  const getBookclubList = (keyword: string) => {
    axiosConfig.get("/api/v1/bookclub/list", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response: any) {
        // success
        setVariable1(response.data);
      })
      .catch(function (error: any) {
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
