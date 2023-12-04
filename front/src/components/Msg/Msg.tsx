import { useContext, useState } from 'react';
import styled from 'styled-components';
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
  font: ${props => props.theme.font['--normal-introduce-font']};
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${props => props.color + '80'};
  margin: 1rem auto;
  pointer-events: all;
`;

const StyledLetterPerson = styled.div`
  text-align: left;
  color: white;
`;

const StyledTo = styled.span`
  color: ${props => props.theme.colors['--nick-name']};
`;

const StyledLetterContent = styled.div`
  white-space: pre;
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
  color: ${props => props.theme.colors['--primary-redp-variant']};
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
  color: ${props => props.theme.colors['--white-primary']};
  font-size: 1rem;
  font-weight: 700;
  line-height: 2rem;
  white-space: pre-wrap;
  resize: none; /* 사용자가 크기를 조정하지 못하게 함 */

  background-attachment: local;
  background-image: repeating-linear-gradient(
    #00000000,
    #00000000 1.8rem,
    #ccc 1.8rem,
    #ccc 1.9rem,
    #00000000 2rem
  );

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
  color: ${props => props.theme.colors['--nick-name']};
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
  font-size: 1rem;
  font-weight: 700;
  pointer-events: stroke;
`;

const Msg = (props: MsgProps): JSX.Element => {
  const [wordCount, setWordCount] = useState(0);
  const { content, sender, setContent, setSender } = useContext(DecoContext);
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
            value={content}
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
              value={sender}
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
