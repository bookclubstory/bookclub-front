import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReducerType, resetStore } from "@modules/index";

const Gnb = (props: any) => {
  const dispatch = useDispatch();
  const token = useSelector((state: ReducerType) => state.session.loginInfo.token);

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => dispatch(resetStore())}
        >
          ILJIN
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/overview" className="nav-link active">
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/biz/list" className="nav-link active">
                Business
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <Link to="/login" className="nav-link" style={{color: "white"}}>Sign In</Link>
            <Link to="/signup" className="btn btn-outline-light">Sign up</Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Gnb;
