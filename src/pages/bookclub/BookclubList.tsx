import React, { useState, useEffect, useRef, Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetStore } from "@modules/index";
import * as actions from "@modules/bookclub/actionOfBookclub";
import axiosConfig from "@utils/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { isNotEmpty, isEmpty } from "@utils/valid";
import Slider from "react-slick";


interface ClubList {
  clubList: string[];
}

const Bookclub = (props: any) => {
  let navigate = useNavigate(); // useHistory hook은 화면이동에 사용할 수 있는 history 인스턴스에 접근하게 해준다.
  const dispatch = useDispatch();  //
  const [clubList, setClubList] = useState<ClubList["clubList"]>([
    "클럽1",
    "클럽2",
    "클럽3",
  ]);


  useEffect(() => {
    // 컴포넌트 로드시 1번 실행
    getBookclubList("");
  }, []);

  const mainImg = {
    user: {
      name: "mainpageImg",
      mainImgUrl:
        "https://as2.ftcdn.net/v2/jpg/03/00/94/69/1000_F_300946931_kSR84OqudEhsmBZH47HU6ud7aZIDMjEx.jpg",
    },
  };
  function Thumbnail(props: any) {
  return(
  <main>
<div className="container-fluid bg-trasparent my-4 p-3" >  {/*       style="position: relative" */}
          <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
              <div className="col">
                  <div className="card h-100 shadow-sm"> <img src="https://youthassembly.or.kr/data/file/B62/thumb-3529829945_EwfyvjSH_8bbee4aeaee03b1a83a72b13f90c52c6bd0df789_805x1153.jpg" className="card-img-top" alt="..." />
                      <div className="label-top shadow-sm">엘사 북클럽</div>
                      <div className="card-body">
                          <div className="clearfix mb-3"> <span className="float-start badge rounded-pill bg-success">서울 마포구</span>  </div>
                          <h5 className="card-title">겨울왕국이 세상에서 제일 좋은 사람들의 모임</h5>
                          <div className="text-center my-4"> <a href="#" className="btn btn-warning">구경하기</a> </div>
                          <div className="clearfix mb-1"> <span className="float-start"><i className="far fa-question-circle"></i></span> <span className="float-end"><i className="fas fa-plus"></i></span> </div>
                      </div>
                  </div>
              </div>
              <div className="col">
                  <div className="card h-100 shadow-sm"> <img src="https://www.seoulfn.com/news/photo/202106/422903_196500_4326.jpg" className="card-img-top" alt="..." />
                      <div className="label-top shadow-sm">마동석 북클럽</div>
                      <div className="card-body">
                          <div className="clearfix mb-3"> <span className="float-start badge rounded-pill bg-success">경기 고양시</span> </div>
                          <h5 className="card-title">마동석이 세상에서 제일 좋은 사람들의 모임</h5>
                          <div className="text-center my-4"> <a href="#" className="btn btn-warning">구경하기</a> </div>
                          <div className="clearfix mb-1"> <span className="float-start"><i className="far fa-question-circle"></i></span> <span className="float-end"><i className="fas fa-plus"></i></span> </div>
                      </div>
                  </div>
              </div>
              <div className="col">
                  <div className="card h-100 shadow-sm"> <img src="http://www.upinews.kr/data/upi/image/20181228/p1065573107656827_601_thum.jpg" className="card-img-top" alt="..." />
                      <div className="label-top shadow-sm">김윤식 북클럽</div>
                      <div className="card-body">
                          <div className="clearfix mb-3"> <span className="float-start badge rounded-pill bg-success">서울 용산구</span>  </div>
                          <h5 className="card-title">김윤식이 세상에서 제일 좋은 사람들의 모임</h5>
                          <div className="text-center my-4"> <a href="#" className="btn btn-warning">구경하기</a> </div>
                          <div className="clearfix mb-1"> <span className="float-start"><i className="far fa-question-circle"></i></span> <span className="float-end"><i className="fas fa-plus"></i></span> </div>
                      </div>
                  </div>
              </div>
              <div className="col">
                  <div className="card h-100 shadow-sm"> <img src="http://img.khan.co.kr/weekly/2021/09/19/l_2021091901002432800207281.jpg" className="card-img-top" alt="..." />
                      <div className="label-top shadow-sm">조우진 북클럽</div>
                      <div className="card-body">
                          <div className="clearfix mb-3"> <span className="float-start badge rounded-pill bg-success">부산 사상구</span> </div>
                          <h5 className="card-title">조우진이 세상에서 제일 좋은 사람들의 모임</h5>
                          <div className="text-center my-4"> <a href="#" className="btn btn-warning">구경하기</a> </div>
                          <div className="clearfix mb-1"> <span className="float-start"><i className="far fa-question-circle"></i></span> <span className="float-end"><i className="fas fa-plus"></i></span> </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </main>)};
  function SetMainImage(props: any) {
    return (
      <img
        className="mainImg"
        src={mainImg.user.mainImgUrl}
        alt={mainImg.user.name}
      />
    );
  }

  const getBookclubList = (keyword: string) => {
    axiosConfig
      .get("/api/v1/bookclub/list", {
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
      <SetMainImage />
      <div>
        <h3>이 달의 추천 모임 </h3>
        <div>
        <Thumbnail />
        </div>
      </div>
       <div>
         <h3>이 달의 신규 모임 </h3>
         <div>
         <Thumbnail />
         </div>
       </div>
{/*       {clubList.map((element) => <div>{element}</div>)} */}
    </div>
  );
};

export default Bookclub;
