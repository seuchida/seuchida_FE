//Modal.js

import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";
import NameCard from "../../pages/MyPage";

const Modal = () => {
  return (
    <ModalPortal>
      <Background>
        {/* <NameCard /> */}
        <Content>모달창~</Content>
      </Background>
    </ModalPortal>
  );
};

export default Modal;

//아래는 styled-components를 통한 스타일링

const Background = styled.div`
  width: 100%;
  height: 80%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;

const Content = styled.div`
  width: 300px;
  height: 300px;
  margin-top: 70px;
  position: relative;
  /* overflow: scroll; */
  background: skyblue;
  border-radius: 20px;
  padding: 20px;
`;