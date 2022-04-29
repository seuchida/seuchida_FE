import React from 'react';
import styled from 'styled-components'
import FooterMenu from '../shared/FooterMenu';
import { KakaoMap } from '../components';




const Map = () => {
  const [state, setState] = React.useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })

  React.useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

 console.log(state.center)
 let UserLoca = state.center

  return (
    <>
    <Header>
      <Title>내 주변에 개설된 <br/>운동매칭이에요</Title>
    
    </Header>
    <div style={{marginTop:"128px", }}>
<KakaoMap MainMap UserLoca ={UserLoca} /></div>
<FooterMenu/>
    </>
  );
};

export default Map;

const Header = styled.div`
  z-index: 3;
  background-color: white;
  width: 100%;
  height: 100px;
  max-width: 420px;
  padding:  24px;
  position: fixed;
  top:0;
`;

const Title = styled.div`
color : #434343;
font-size: 28px;
font-weight: bold;
margin-top: 12px;
`

