import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary
import { useState } from 'react';

interface MsgProps {
  color: string;
  isInput: boolean;
  content: string;
  sender: string;
}

interface MsgColor {
  color: string;
}

const StyledLetterBox = styled.div<MsgColor>`
  width: 80%;
  display: flex;
  align-self: center;
  font: ${theme.font['--normal-introduce-font']};
  flex-direction: column;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${props => props.color + '80'};
  margin: 1rem;
`;

const StyledLetterPerson = styled.div`
  text-align: left;
  color: white;
`;

const StyledTo = styled.span`
  color: ${theme.colors['--nick-name']};
`;

const StyledLetterContent = styled.div`
  text-align: center;
  color: white;
`;

const StyledFromBox = styled(StyledLetterPerson)`
  text-align: right;
  display: flex;
  justify-content: space-between;
`;

const StyledFrom = styled.span`

  color: ${theme.colors['--primary-redp-variant']};
`;

const StyledInputBox = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  width: 100%;       /* 너비를 100%로 설정 */

  border: none;
  background-color: transparent;
  color: ${theme.colors['--white-primary']};
  font-size: 1rem;
  font-weight: 700;
  outline: none;
  line-height: 2em;  /* 줄 간격 설정, 10줄에 맞게 조절 필요 */
  overflow: auto;    /* 내용이 많아질 경우 스크롤바 표시 */
  resize: none;      /* 사용자가 크기를 조정하지 못하게 함 */


  pointer-events: stroke;

  /* 각 줄마다 밑줄을 추가하는 배경 설정 */
  background-image: linear-gradient(to bottom, transparent 1.9em, ${theme.colors['--white-primary']} 1.9em);
  background-size: 100% 2em;

  &::placeholder {
    color: gray;
    font-size: 1rem;
    font-weight: 700;
  }

  /* 스크롤바 숨김 처리 */
  /* 크롬, 사파리, 기타 웹킷 기반 브라우저 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 파이어폭스 */
  scrollbar-width: none;

  /* 인터넷 익스플로러, 엣지 */
  -ms-overflow-style: none;
`;

const StyledFromInput = styled.input`
  width: 40%;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${theme.colors['--nick-name']};
  font-size: 1.0rem;
  font-weight: 700;
  pointer-events: stroke;
`;

const Msg = (props: MsgProps) => {
  const userName = mock.user_name;
  const [wordCount, setWordCount] = useState(0);

  const wordLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length > 500) {
      e.target.value = text.substring(0, 500);
    }
    setWordCount(e.target.value.length);
  };

  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        To. <StyledTo>{userName}</StyledTo>
      </StyledLetterPerson>

      {props.isInput ? (
        <StyledInputBox>
          <StyledTextArea onChange={wordLength} rows={5} placeholder="편지를 작성해주세요." />
        </StyledInputBox>
      ) : (
        <StyledLetterContent>{props.content}</StyledLetterContent>
      )}

      <StyledFromBox>
        {props.sender === '' ? `${wordCount} / 500` : null}
        <StyledFrom>
          From.
          {props.sender === '' ? <StyledFromInput /> : props.sender}
        </StyledFrom>
      </StyledFromBox>
    </StyledLetterBox>
  );
};

export default Msg;
