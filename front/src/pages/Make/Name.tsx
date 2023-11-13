import { useState, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { Button } from '../../components';

interface NameProps {
  set: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledBody = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 5%;
`;

const StyledExplain = styled.div`
  font: ${theme.font['--normal-nickname-font']};
  color: white;
  padding-top: 45%;
`;

const StyledPink = styled.span`
  color: ${theme.colors['--primary-redp-variant']};
`;

const StyledNickName = styled.div`
  font: ${theme.font['--normal-login-font']};
  padding-top: 15%;
  color: white;
`;

const StyledInput = styled.input`
  margin-top: 5%;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  font: ${theme.font['--normal-nickname-input-font']};

  &::placeholder {
    color: ${theme.colors['--sub-text']};
  }

  &:focus {
    outline: none;
  }
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25%;
`;

const validNickname = (
  nicknameRef: React.RefObject<HTMLInputElement>,
  setStartNickname: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (nicknameRef.current && nicknameRef.current.value.length >= 2)
    setStartNickname(true);
};

const Name = (props: NameProps) => {
  const [startNickname, setStartNickname] = useState(false);
  const nicknameRef = useRef<HTMLInputElement>(null);

  return (
    <StyledBody>
      <StyledExplain>
        사용하실
        <br />
        <StyledPink>닉네임</StyledPink>을 입력해주세요.
      </StyledExplain>

      <StyledNickName>닉네임</StyledNickName>
      <StyledInput
        ref={nicknameRef}
        placeholder="라온이"
        onChange={() => validNickname(nicknameRef, setStartNickname)}
      />

      <StyledButtonBox>
        <Button
          text={'시작하기'}
          color={theme.colors['--primary-red-primary']}
          view={props.set}
          disabled={startNickname ? false : true}
        />
      </StyledButtonBox>
    </StyledBody>
  );
};

export default Name;
