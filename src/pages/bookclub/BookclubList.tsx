import React, { useState, useEffect, useRef, Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "@modules/index";
import * as actions from "@modules/bookclub/actionOfBookclub";
import axiosConfig from "@utils/axiosConfig";
import { isNotEmpty, isEmpty } from "@utils/valid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


interface ClubList {
  clubList: string[],
}



const Bookclub = (props: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [clubList, setClubList] = useState<ClubList["clubList"]>(["클럽1", "클럽2", "클럽3"]);

  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getBookclubList("");
  }, []);

  const mainImg = {
    user: {
      name:'mainpageImg',
      mainImgUrl : 'https://as2.ftcdn.net/v2/jpg/03/00/94/69/1000_F_300946931_kSR84OqudEhsmBZH47HU6ud7aZIDMjEx.jpg'
    }
  }

  

  function SetMainImage(props: any) {
    return (
      <img
      className="mainImg"
      src={mainImg.user.mainImgUrl}
      alt={mainImg.user.name}/>
    );
  }

  

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
      <SetMainImage
      />
      <div>
        <h3></h3>
        <h3>이 달의 추천 모임 </h3>
      </div>
    
      {/* {clubList.map((element) => <div>{element}</div>)} */}
    </div>
  );
};

export default Bookclub;
