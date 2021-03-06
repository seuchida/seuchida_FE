import React, { useEffect, useState } from "react";
import { Text, Grid, GoBack } from "../elements/Index";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FooterMenu from "../shared/FooterMenu";
import Modal from "../components/Modal/Modal";
import ModalData from "../components/Modal/ModalData";
import { Redirect } from "react-router-dom";

import { IconContext } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";

const PostWrite_4 = (props) => {
  document.body.style.overscrollBehavior = "none";
  const history = useHistory();

  //모달 오픈 state
  const [isOpen, setIsOpen] = React.useState(false);

  const { kakao } = window;

  let [address, setAddress] = useState();
  let [spot, setSpot] = useState();
  let [latitude, setLatitude] = useState();
  let [longitude, setLongitude] = useState();

  const [searchAddress, setSearchAddress] = useState();
  const [searchSpot, setSearchSpot] = useState();
  const [searchLatitude, setSearchLatitude] = useState();
  const [searchLongitude, setSearchLongitude] = useState();

  // 지도 검색 기능
  const [inputText, setInputText] = useState("");
  let [searchPlace, setSearchPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(inputText);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude; // 위도
      const lng = pos.coords.longitude; // 경도

      const mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);

      const imageSrc = "/img/postpoint.png",
        imageSize = new kakao.maps.Size(38, 53),
        imageOption = { offset: new kakao.maps.Point(19, 53) };

      const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(); // 표시용

      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder(lat, lng);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //마커 표시

      const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        }),
        infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        searchDetailAddrFromCoords(
          mouseEvent.latLng,
          function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              let detailAddr = !!result[0].road_address
                ? "<div>도로명주소 : " +
                  result[0].road_address.address_name +
                  "</div>"
                : "";
              detailAddr +=
                "<div>지번 주소 : " + result[0].address.address_name + "</div>";
              let home =
                result[0].address.region_1depth_name +
                " " +
                result[0].address.region_2depth_name;
              let town = result[0].road_address?.building_name
                ? result[0].road_address.building_name
                : result[0].address.address_name;

              let content =
                '<div class="bAddr" style="padding:5px;font-size:12px;>' +
                '<span class="title">약속 장소</span>' +
                detailAddr +
                "</div>";

              let la = mouseEvent.latLng.Ma;
              let lo = mouseEvent.latLng.La;
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              infowindow.setContent(content);
              infowindow.open(map, marker);
              setAddress(home); //state값 넘겨주기
              setSpot(town);
              setLatitude(la);
              setLongitude(lo);

              setSearchAddress(home);
              setSearchSpot(town);
              setSearchLatitude(la);
              setSearchLongitude(lo);
            }
          }
        );
      });

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////
      //검색

      let infowindow_search = new kakao.maps.InfoWindow({ zIndex: 1 });
      let ps_search = new kakao.maps.services.Places();
      if (searchPlace === "") {
        searchPlace = " ";
      }
      ps_search.keywordSearch(searchPlace, placesSearchCB);
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      }
      function displayMarker(place) {
        let marker_search = new kakao.maps.Marker({
          map: map,
          image: markerImage,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        kakao.maps.event.addListener(marker_search, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow_search.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>" +
              '<div style="padding:5px;font-size:12px;">도로명주소 : ' +
              place.road_address_name +
              "</div>" +
              '<div style="padding:5px;font-size:12px;">지번 주소 : ' +
              place.address_name +
              "</div>"
          );
          infowindow_search.open(map, marker_search);
          setSearchAddress(place.address_name.split(" ").slice(0, 2).join(" "));
          setSearchSpot(place.place_name);
          setSearchLatitude(place.y);
          setSearchLongitude(place.x);

          //마커 제거하기
          //표시한 마커를 누르면 검색한 마커가 없어집니다.
          let arr = [infowindow_search];

          function closeInfoWindow() {
            for (var i = 0; i < arr.length; i++) {
              arr[i].close();
            }
          }

          kakao.maps.event.addListener(marker, "click", function () {
            closeInfoWindow();
            infowindow.open(map, marker); //인포윈도우 열기
          });

          //검색한 마커 누르면 표시한 마커가 없어집니다.
          let arr_marker = [marker];
          let arr_info = [infowindow];

          function deleteMarker() {
            for (var i = 0; i < arr_marker.length; i++) {
              arr_marker[i].setMap(null);
            }
          }
          function closeInfoWindow_search() {
            for (var i = 0; i < arr_info.length; i++) {
              arr_info[i].close();
            }
          }

          kakao.maps.event.addListener(marker_search, "click", function () {
            deleteMarker();
            closeInfoWindow_search();
          });
        });
      }
    });
  }, [searchPlace]);

  if (searchAddress) {
    address = searchAddress;
    spot = searchSpot;
    latitude = searchLatitude;
    longitude = searchLongitude;
  }

  //유효성 검사
  const check = (e) => {
    if (!address) {
      setIsOpen(true);
    } else {
      history.push("/postwrite3");
      localStorage.setItem("address", address); //localStorage 에 저장 합니다
      localStorage.setItem("spot", spot); //localStorage 에 저장 합니다
      localStorage.setItem("latitude", latitude); //localStorage 에 저장 합니다
      localStorage.setItem("longitude", longitude); //localStorage 에 저장 합니다
    }
  };

  //새로고침 시 작성 첫 번째 페이지로 이동
  if (document.readyState === "interactive") {
    //로컬 값 날림
    localStorage.setItem("address", "");
    localStorage.setItem("spot", "");
    localStorage.setItem("latitude", "");
    localStorage.setItem("longitude", "");
    localStorage.setItem("datemate", "");
    localStorage.setItem("memberAge", "");
    localStorage.setItem("memberGender", "");
    localStorage.setItem("maxMember", 2);
    localStorage.setItem("postCategory", "");
    localStorage.setItem("postTitle", "");
    localStorage.setItem("postDesc", "");
    localStorage.setItem("showOptions", "");
    localStorage.setItem("showDate", "");
    localStorage.setItem("showTime", "");
    //새로고침 경고
    window.onbeforeunload = function () {
      return "새로고침 경고";
    };
    return <Redirect to="/postcategory" />;
  }

  const backEvent = () => {
    history.push("/postwrite3");
  };

  return (
    <>
      <Container>
        {/* 검색 */}
        <GoBack postBack text="모임 만들기" state={backEvent} />
        <Grid margin="12px 0px 0px 0px" padding="0px 0px 0px 24px">
          <form className="inputForm" onSubmit={handleSubmit}>
            <SearchContainer>
              <Search
                placeholder="장소 또는 지역을 검색하세요"
                onChange={onChange}
                value={inputText || ""}
              />
              <img src="/img/search.png" onClick={handleSubmit} alt="search" />
            </SearchContainer>
          </form>
        </Grid>
        <Grid
          row
          margin="12px 0px"
          height="auto"
          padding="12px 24px 12px 0px"
          justify="space-between"
        >
          {" "}
          <Grid row margin="12px 0px 0px 24px">
            <IconContext.Provider value={{ color: "#FF6B52", size: "16px" }}>
              <FaMapMarkerAlt />
            </IconContext.Provider>
            <Text bold width="100px" margin="0px 12px" size="16px">
              현재위치
            </Text>
            <Grid isFlex_end>{spot === "null" ? "" : spot}</Grid>
          </Grid>
        </Grid>

        <div
          id="map"
          style={{
            width: "100%",
            height: "800px",
            margin: "12px 0px",
          }}
        ></div>
        <FooterMenu next text="확인" state={check} />
        {/* 경고창 모달 */}
        <Modal open={isOpen}>
          <ModalData
            Alert
            text="장소를 선택해주세요"
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 0px;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 94%;
  height: 56px;
  position: relative;
  img {
    position: absolute;
    right: 20px;
    top: 18px;
  }
`;

const Search = styled.input`
  border: 0;
  padding-left: 12px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 18px;
`;

export default PostWrite_4;
