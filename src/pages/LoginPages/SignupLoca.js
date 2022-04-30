import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupLoca = () => {
  const history = useHistory();
  const [address, setAddress] = useState();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const FindLoca = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude; // 위도
          const lng = pos.coords.longitude; // 경도
          setState((prev) => ({
            ...prev,
            center: {
              lat,
              lng,
            },
            isLoading: false,
          }));
          axios
            .get(
              `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
              {
                headers: {
                  Authorization: "KakaoAK 5498cafd5af35c66b35808e2b9e12971",
                },
              }
            )
            .then((res) => {
              const location = res.data.documents[0].address; //내 현 위치의 주소
              const result = `${location.region_1depth_name} ${location.region_2depth_name}`;
              // console.log(result);
              setAddress(result); //input에 지소 띄우기
            });
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  };

  return (
    <TotBox>
      <Map // 지도를 표시할 Container
        id="map"
        center={state.center}
        style={{
          // 지도의 크기
          width: "300px",
          height: "300px",
          margin: "auto",
        }}
        level={3} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: "https://ifh.cc/g/NcBFMY.png", // 마커이미지의 주소입니다
              size: {
                width: 40,
                height: 40,
              },
            }}
          >
            <MsgBox>{state.errMsg ? state.errMsg : "내 위치"}</MsgBox>
          </MapMarker>
        )}
      </Map>

      <Box>
        <Input
          value={address || ""}
          placeholder="아래 버튼을 통해 동네를 설정해 주세요."
          type="text"
          onChange={(e) => console.log(e.target.value)}
        />
        <Btn onClick={FindLoca}>동네 인증</Btn>
      </Box>

      <Link
        to={{
          // pathname: "/addprofile",
          state: { address },
        }}
      >
        <Next
          onClick={() => {
            history.push("/addprofile");
          }}
        >
          다음
        </Next>
      </Link>
    </TotBox>
  );
};

const TotBox = styled.div`
  width: 300px;
  height: 100%;
  /* margin: auto; */
`;

const MsgBox = styled.div`
  padding: 5px;
`;
const Box = styled.div`
  width: 300px;
  height: 10vh;
  margin-top: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;
const Input = styled.input`
  width: 230px;
  height: 45px;
`;
const Btn = styled.button`
  width: 50px;
  height: 50px;
`;
const Next = styled.button`
  width: 300px;
  height: 45px;
  margin: auto;
  margin-top: 10%;
  border: none;
  background: gray;
`;

export default SignupLoca;
