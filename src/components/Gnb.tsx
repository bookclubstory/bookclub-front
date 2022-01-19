import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReducerType, resetStore } from "@modules/index";
import {Container, Search, Icon, } from 'semantic-ui-react';

const Gnb = (props: any) => {
  const dispatch = useDispatch();
  const token = useSelector((state: ReducerType) => state.session.loginInfo.token);

  return (
        <nav className="ui large inverted top fixed menu">
            <Container fluid>
                <Link
                  to="/"
                  className="header item"
                  onClick={() => dispatch(resetStore())}>
                  <Icon name='book'/>
                  우동북
                </Link>
                <div className='item'>
                  <Search></Search>
                </div>

                <div className='right item'>
                  <Link to="/overview" className="item">Overview</Link>
                  <Link to="/bookclub/list" className="item">북클럽</Link>
                  <Link to="/bookpost/list" className="item">독서로그</Link>
                  <Link to="/login" className="ui button" >Log in</Link>
                  <Link to="/signup" className="ui button" style={{ marginLeft: '0.5em' }}>Sign Up</Link>
                </div>
            </Container>
        </nav>
  );
};

export default Gnb;
