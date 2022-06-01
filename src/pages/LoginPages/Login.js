import React from "react";
import styled from "styled-components";
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL } from "../../shared/OAuth";
import { Grid } from "../../elements/Index";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  return (
    <Grid height="100vh" bg="#00D282">
      <Grid column>
        <Grid column width="200px" height="200px" margin="auto">
          <img
            src="./img/login.png"
            style={{ margin: "150px 0px" }}
            alt="로그인 이미지"
          />
        </Grid>
        <Around onClick={() => history.push("/guide")}>가이드</Around>
        <div style={{ margin: "30vh 0px 20px 0px" }}>
          <Akakao
            href={KAKAO_AUTH_URL}
            onClick={() => {
              history.push("/sigupdone");
            }}
          >
            <img src="./img/kakao_login_medium_wide.png" alt="카카오로그인" />
          </Akakao>
        </div>
        <GoogleBtn
          onClick={() => {
            history.push("/signupdone");
          }}
        >
          <img src="./img/btn_google_light_normal_ios.svg" alt="구글로그인" />
          <Agoogle href={GOOGLE_AUTH_URL}>구글 로그인</Agoogle>
        </GoogleBtn>
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Login;

const Akakao = styled.a`
  text-decoration-line: none;
  display: block;
  font-weight: bold;
  font-size: 14px;
`;

const Agoogle = styled.a`
  margin-left: 78px;
  margin-top: 13px;
  text-decoration-line: none;
  display: block;
  font-weight: bold;
  font-size: 14px;
  color: black;
`;

const GoogleBtn = styled.button`
  display: flex;
  width: 300px;
  height: 45px;
  background: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 50px;
  padding-left: 0px;
  img {
    height: 44px;
    width: 44px;
  }
`;

const Around = styled.button`
  min-width: "100px";
  height: 30px;
  margin: 120px 0px -20px 0px;
  background: #1aec9c;
  border: none;
  border-radius: 5px;
  color: white;
`;
