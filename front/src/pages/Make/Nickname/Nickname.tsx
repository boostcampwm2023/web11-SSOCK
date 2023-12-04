import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../../../utils';
import { Button } from '../../../components';

const StyledWrap = styled.div`
  width: 100%;
  height: 80%;
  padding: 5%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.size['--desktop-width']}) {
    width: ${props => props.theme.size['--desktop-width']};
  }
`;

const StyledExplain = styled.div`
  font: ${props => props.theme.font['--normal-nickname-font']};
  color: white;
  padding-top: 40%;

  @media (min-width: ${props => props.theme.size['--desktop-width']}) {
    padding-top: 25%;
  }
`;

const StyledPink = styled.span`
  color: ${props => props.theme.colors['--primary-redp-variant']};
`;

const StyledNickName = styled.div`
  font: ${props => props.theme.font['--normal-login-font']};
  color: white;
`;

const StyledInput = styled.input`
  font: ${props => props.theme.font['--normal-nickname-input-font']};
  margin-top: 5%;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;

  &::placeholder {
    color: ${props => props.theme.colors['--sub-text']};
  }

  &:focus {
    outline: none;
  }
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;

const validNickname = (
  nicknameRef: React.RefObject<HTMLInputElement>,
  setStartNickname: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (nicknameRef.current && nicknameRef.current.value.length >= 2)
    setStartNickname(true);
};

const Nickname = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(false);
  const [startNickname, setStartNickname] = useState(false);
  const nicknameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!nickname || !nicknameRef.current?.value) return;
    if (nicknameRef.current.value.length <= 8) {
      axios
        .post('/api/snowball', { nickname: nicknameRef.current.value })
        .then(res => {
          if (res.status === 200) {
            navigate('/make/snowball');
          }
        })
        .catch(() => {
          alert('다시 시도해주십시오.');
        });
    } else {
      alert('8글자 이하로 설정 가능합니다.');
    }
  }, [nickname, navigate]);

  return (
    <StyledWrap>
      <StyledExplain>
        사용하실
        <br />
        <StyledPink>닉네임</StyledPink>을 입력해주세요.
      </StyledExplain>

      <div>
        <StyledNickName>닉네임</StyledNickName>
        <StyledInput
          ref={nicknameRef}
          placeholder="ex) 라온이"
          onChange={() => validNickname(nicknameRef, setStartNickname)}
        />
      </div>

      <StyledButtonBox>
        <Button
          text={'시작하기'}
          color={theme.colors['--primary-red-primary']}
          view={[nickname, setNickname]}
          disabled={!startNickname}
        />
      </StyledButtonBox>
    </StyledWrap>
  );
};

export default Nickname;
