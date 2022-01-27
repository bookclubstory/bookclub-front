import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "@modules/index";
import * as actions from "@modules/bookclub/actionOfBookclub";
import axiosConfig from "@utils/axiosConfig";
import { isNotEmpty, isEmpty } from "@utils/valid";

interface ClubList {
  clubList: string[],
}
const Bookclub = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [clubList, setClubList] = useState<ClubList["clubList"]>(["A", "B", "C"]);

  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    //getBookclubList("");
  }, []);

  const getBookclubList = (keyword: string) => {
    axiosConfig.get("/api/v1/bookclub/list", {
      params: {
        keyword: keyword,
      },
    })
      .then(function (response: any) {
        // success
        setClubList(response.data.clubList);
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
      {clubList.map((element, key) => <div key={key}>{element}</div>)}
    </div>
  );
};

export default Bookclub;
