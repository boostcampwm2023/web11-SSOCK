import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary
import { useContext, useState } from 'react';
import { DecoContext } from '../../pages/Visit/Deco/DecoProvider';

interface MsgProps {
  color: string;
  isInput: boolean;
  content: string;
  sender: string;
  to: string;
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
  flex-direction: row-reverse;
  display: flex;
  justify-content: space-between;
`;

const StyledFrom = styled.span`
  text-align: right;
  color: ${theme.colors['--primary-redp-variant']};
`;

const StyledInputBox = styled.div`
  text-align: right;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  width: 100%; /* 너비를 100%로 설정 */
  outline: none;
  border: none;
  background-color: transparent;
  color: ${theme.colors['--white-primary']};
  font-size: 1rem;
  font-weight: 700;
  line-height: 2rem;
  white-space: pre-wrap;
  resize: none; /* 사용자가 크기를 조정하지 못하게 함 */

  /* 각 줄마다 밑줄을 추가하는 배경 설정 */
  /* background-image: linear-gradient(
    to bottom,
    transparent 1.9rem,
    ${theme.colors['--white-primary']} 2rem
  );
  background-size: 100% 2rem; */

  background-attachment: local;
  background-image: repeating-linear-gradient(
    #00000000,
    #00000000 1.8rem,
    #ccc 1.8rem,
    #ccc 1.9rem,
    #00000000 2rem
  );
  /* &::placeholder {
    color: gray;
    font-size: 1rem;
    font-weight: 700;
  } */

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
  width: 55%;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${theme.colors['--nick-name']};
  font-size: 1rem;
  font-weight: 700;
  pointer-events: stroke;
`;

const Msg = (props: MsgProps) => {
  const [wordCount, setWordCount] = useState(0);
  const { setContent, setSender } = useContext(DecoContext);
  const maxWordCount = 500;

  const wordLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target;
    text.style.height = '1px';
    text.style.height = text.scrollHeight + 'px';
    if (text.value.length > maxWordCount) {
      text.value = text.value.substring(0, maxWordCount);
    }
    setContent(text.value);
    setWordCount(text.value.length);
  };

  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        To. <StyledTo>{props.to}</StyledTo>
      </StyledLetterPerson>

      {props.isInput ? (
        <StyledInputBox>
          <StyledTextArea
            rows={1}
            onChange={wordLength}
            placeholder="편지를 작성해주세요."
          />
        </StyledInputBox>
      ) : (
        <StyledLetterContent>{props.content}</StyledLetterContent>
      )}

      <StyledFromBox>
        <StyledFrom>
          From.
          {props.isInput ? (
            <StyledFromInput
              placeholder="이름입력"
              onFocus={e => {
                e.target.value = '';
              }}
              onChange={e => {
                if (e.target.value.length > 8) {
                  e.target.value = e.target.value.substring(0, 8);
                }
                setSender(e.target.value);
              }}
            />
          ) : (
            <StyledFromInput value={props.sender} disabled />
          )}
        </StyledFrom>

        {props.isInput && props.sender === '' ? `${wordCount} / 500` : null}
      </StyledFromBox>
    </StyledLetterBox>
  );
};

export default Msg;
