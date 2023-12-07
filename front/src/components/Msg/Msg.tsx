import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { DecoContext } from '@pages/Visit/Deco/DecoProvider';
import { MessageContext } from '@pages/Visit/MessageProvider';
import { createPortal } from 'react-dom';

interface MsgProps {
  color: string;
  isInput: boolean;
  content: string;
  sender: string;
  to: string;
  isDeco: boolean;
}

interface MsgColor {
  color: string;
}

const StyledLetterBox = styled.div<MsgColor>`
flex: 0 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  font: ${props => props.theme.font['--normal-introduce-font']};
  text-shadow: ${props => props.theme.font['--text-shadow']};
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${props => props.color + '80'};
  pointer-events: auto;
`;

const StyledLetterPerson = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  color: white;
  height: 2rem;
`;

const StyledLetterInput = styled.div`
  color: white;
  text-align: left;
`;

const StyledTo = styled.span`
  color: ${props => props.theme.colors['--nick-name']};
`;

const StyledInputBox = styled.div`
  text-align: right;
  width: 100%;
  height: 2rem;
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

const StyledLetterContent = styled.div`
  white-space: pre-wrap;
  text-align: center;
  color: white;
  word-wrap: break-word;
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

const StyledFromInput = styled.input`
  width: 55%;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors['--nick-name']};
  text-shadow: ${props => props.theme.font['--text-shadow']};
  font-size: 1rem;
  font-weight: 700;
  pointer-events: stroke;
`;

const StyledDeleteButton = styled.button`
  color: white;
  text-shadow: ${props => props.theme.font['--text-shadow']};
  font-size: 1rem;
`;

const StyledToWrap = styled.div``;

const MsgBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: scroll  ;
`;

const DecoBackground = styled.div`
  width: 100%;
  padding: 3rem;
`

const Msg = (props: MsgProps): JSX.Element => {
  const [wordCount, setWordCount] = useState(0);
  const { content, sender, setContent, setSender } = useContext(DecoContext);
  const maxWordCount = 500;
  const { user } = useParams();
  const { setMessage } = useContext(MessageContext);

  const id = undefined;
  if (user === undefined && id !== undefined) {
    // id는 메시지 고유 id, user===undefined로 visit이 아닌 main에서만 처리되도록
    axios
      .put(`/api/message/${id}`, { message_id: id }, { withCredentials: true })
      .then(res => {
        console.log(res);
      })
      .catch(e => console.error(e));
  }

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

  const removeMsg = () => {
    setMessage('');
  };

  const stopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
    { !props.isInput && !props.isDeco ? (
      createPortal(
        <MsgBackground onClick={removeMsg}>
          <StyledLetterBox color={props.color} onClick={stopEvent}>
            {props.isInput ? (
              <StyledLetterInput>
                To. <StyledTo>{props.to}</StyledTo>
              </StyledLetterInput>
            ) : (
              <StyledLetterPerson>
                <StyledToWrap>
                  To. <StyledTo>{props.to}</StyledTo>
                </StyledToWrap>
                {props.isDeco ? null : (
                  <StyledDeleteButton onClick={removeMsg}>X</StyledDeleteButton>
                )}
              </StyledLetterPerson>
            )}
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
              <StyledLetterContent>
                {props.content.toString()}
              </StyledLetterContent>
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

              {props.isInput && props.sender === '익명' ? (
                `${wordCount} / 500`
              ) : null
              }
            </StyledFromBox>
          </StyledLetterBox>
        </MsgBackground>,
        document.body
      )
    ) : (
      <DecoBackground>
          <StyledLetterBox color={props.color}>
            {props.isInput ? (
              <StyledLetterInput>
                To. <StyledTo>{props.to}</StyledTo>
              </StyledLetterInput>
            ) : (
              <StyledLetterPerson>
                <StyledToWrap>
                  To. <StyledTo>{props.to}</StyledTo>
                </StyledToWrap>
                {props.isDeco ? null : (
                  <StyledDeleteButton onClick={removeMsg}>X</StyledDeleteButton>
                )}
              </StyledLetterPerson>
            )}
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
              <StyledLetterContent>
                {props.content.toString()}
              </StyledLetterContent>
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

              {props.isInput && props.sender === '익명' ? (
                `${wordCount} / 500`
              ) : null
              }
            </StyledFromBox>
          </StyledLetterBox>
          </DecoBackground>
    ) }
      
    </>
  );
};

export default Msg;
