import React, { useState } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import FooterMenu from "../shared/FooterMenu";
import Main from "../pages/Main";
import SignupLoca from "../pages/LoginPages/SignupLoca";
import AddProfile from "../pages/LoginPages/AddProfile";
import Category from "../pages/LoginPages/Category";
import SignupDone from "../pages/LoginPages/SignupDone";
import Time from "../components/Time";
import Done from "../pages/LoginPages/Done";
import axios from "axios";

function App() {
  // const [address, setAddress] = useState();
  // const [state, setState] = useState({
  //   center: {
  //     lat: 33.450701,
  //     lng: 126.570667,
  //   },
  //   errMsg: null,
  //   isLoading: true,
  // });
  // if (navigator.geolocation) {
  //   // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //   navigator.geolocation.watchPosition(
  //     (pos) => {
  //       const lat = pos.coords.latitude; // 위도
  //       const lng = pos.coords.longitude; // 경도
  //       setState((prev) => ({
  //         ...prev,
  //         center: {
  //           lat,
  //           lng,
  //         },
  //         isLoading: false,
  //       }));
  //       axios
  //         .get(
  //           `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
  //           {
  //             headers: {
  //               Authorization: "KakaoAK 5498cafd5af35c66b35808e2b9e12971",
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           const location = res.data.documents[0].address; //내 현 위치의 주소
  //           const result = location.address_name;
  //           console.log(res);
  //           setAddress(result); //input에 지소 띄우기
  //         });
  //     },
  //     (err) => {
  //       setState((prev) => ({
  //         ...prev,
  //         errMsg: err.message,
  //         isLoading: false,
  //       }));
  //     }
  //   );
  // } else {
  //   // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  //   setState((prev) => ({
  //     ...prev,
  //     errMsg: "geolocation을 사용할수 없어요..",
  //     isLoading: false,
  //   }));
  // }
  return (
    <>
      <Container>
        <ConnectedRouter history={history}>
          <Route path="/main" exact component={Main} />
          <Route path="/signuploca" exact component={SignupLoca} />
          <Route path="/addprofile" exact component={AddProfile} />
          <Route path="/time" exact component={Time} />
          <Route path="/category" exact component={Category} />
          <Route path="/signupdone" exact component={SignupDone} />
          <Route path="/done" exact component={Done} />
          <FooterMenu />
        </ConnectedRouter>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 420px;
  background-color: beige;
  min-height: 100vh;
`;

export default App;
