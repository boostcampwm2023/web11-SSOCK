import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MessageRecoil } from '@states';
import { DecoContext } from '@pages/Visit/Deco/DecoProvider';

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
  overflow: scroll;

  @media (min-width: ${props => props.theme.size['--desktop-min-width']}) {
    width: ${props => props.theme.size['--desktop-width']};
    left: 50%;
    transform: translateX(-50%);
  }
`;

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

const StyledLetterInput = styled.div`
  color: white;
  text-align: left;
`;

const StyledTo = styled.span`
  color: ${props => props.theme.colors['--nick-name']};
`;

const StyledLetterPerson = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  color: white;
  height: 2rem;
`;

const StyledToWrap = styled.div``;

const StyledDeleteButton = styled.button`
  color: white;
  text-shadow: ${props => props.theme.font['--text-shadow']};
  font-size: 1rem;
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

const StyledFrom = styled.span`
  text-align: right;
  color: ${props => props.theme.colors['--primary-redp-variant']};
`;

const DecoBackground = styled.div`
  width: 100%;
  padding: 3rem;
`;

const Msg = (props: MsgProps): JSX.Element => {
  const [wordCount, setWordCount] = useState(0);
  const { content, sender, setContent, setSender } = useContext(DecoContext);
  const maxWordCount = 500;
  const closeMessage = useResetRecoilState(MessageRecoil);

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

  const stopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const sub8Letter = (name: string) => {
    if (name.length > 8) {
      name = name.substring(0, 8);
    }
    setSender(name);
  };

  return (
    <>
      {!props.isInput && !props.isDeco ? (
        createPortal(
          <MsgBackground onClick={closeMessage}>
            <StyledLetterBox color={props.color} onClick={stopEvent}>
              {props.isInput ? (
                <>
                  <StyledLetterInput>
                    To. <StyledTo>{props.to}</StyledTo>
                  </StyledLetterInput>

                  <StyledInputBox>
                    <StyledTextArea
                      rows={1}
                      value={content}
                      onChange={wordLength}
                      placeholder="편지를 작성해주세요."
                    />
                  </StyledInputBox>
                </>
              ) : (
                <>
                  <StyledLetterPerson>
                    <StyledToWrap>
                      To. <StyledTo>{props.to}</StyledTo>
                    </StyledToWrap>

                    {props.isDeco ? null : (
                      <StyledDeleteButton onClick={closeMessage}>
                        X
                      </StyledDeleteButton>
                    )}
                  </StyledLetterPerson>

                  <StyledLetterContent>
                    {props.content.toString()}
                  </StyledLetterContent>
                </>
              )}

              <StyledFromBox>
                <StyledFrom>
                  From.
                  {props.isInput ? (
                    <StyledFromInput
                      value={sender}
                      placeholder="이름입력"
                      onFocus={e => (e.target.value = '')}
                      onChange={e => sub8Letter(e.target.value)}
                    />
                  ) : (
                    <StyledFromInput value={props.sender} disabled />
                  )}
                </StyledFrom>

                {props.isInput && props.sender === '익명'
                  ? `${wordCount} / 500`
                  : null}
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
                  <StyledDeleteButton onClick={closeMessage}>
                    X
                  </StyledDeleteButton>
                )}
              </StyledLetterPerson>
            )}

            {props.isInput ? (
              <StyledInputBox>
                <StyledTextArea
                  id="textarea"
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
                    id="fromInput"
                    value={sender}
                    placeholder="이름입력"
                    onFocus={e => (e.target.value = '')}
                    onChange={e => sub8Letter(e.target.value)}
                  />
                ) : (
                  <StyledFromInput value={props.sender} disabled />
                )}
              </StyledFrom>

              {props.isInput && props.sender === '익명'
                ? `${wordCount} / 500`
                : null}
            </StyledFromBox>
          </StyledLetterBox>
        </DecoBackground>
      )}
    </>
  );
};

export default Msg;
