import React from 'react';
import styled from 'styled-components';

import { Text, Grid } from './Index';

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    keyUp,
    keyPress,
    chatName,
    bold,
    size,
    width,
    height,
    wd,
    bg,
  } = props;

  const styles = {
    placeholder,
    onChange: _onChange,
    type,
    multiLine,
    keyUp,
    keyPress,
    chatName,
    bold,
    size,
    width,
    height,
    value,
    wd,
    bg,
  };
  //플레이스홀더, 라벨속성 지정가능, onChange:_onChange로 지정
  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin='0px'>{label}</Text>}
        <ElTextarea {...styles} rows={10}></ElTextarea>
      </Grid>
    );
  }

  if (chatName) {
    return (
      <Grid>
        <ElChatName {...styles} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {/* <Grid> */}
      {label && <Text margin='0px'>{label}</Text>}
      <ElInput {...styles} />
      {/* </Grid> */}
    </React.Fragment>
  );
};

Input.defaultProps = {
  width: '390px',
  multiLine: false,
  label: false,
  placeholder: '텍스트를 입력해주세요.',
  type: 'text',
  value: '',
  _onChange: () => {},
  keyUp: () => {},
  keyPress: () => {},
  bold: false,
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
`;

const ElInput = styled.input`
  border: none;
  border-radius: 5px;
  background: #ddd;
  max-width: 390px;
  width: 342px;
  ${(props) =>
    props.wd ? `width: 213px; background: white; border: 1px solid #ddd;` : ''};
  height: ${(props) => props.height};
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
`;

const ElChatName = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
  box-sizing: border-box;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
`;

export default Input;
