import { useContext, useState } from 'react';
import styled from 'styled-components';
import { DecoContext } from '@pages/Make/Snowball/MainDeco/DecoProvider';

const StyledLetterBox = styled.div`
  width: 80%;
  display: flex;
  align-self: center;
  font: ${props => props.theme.font['--normal-introduce-font']};
  flex-direction: column;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${props => props.theme.colors['--primary-red-primary']};
`;

const StyledLetterPerson = styled.div`
  text-align: left;
  color: white;
`;

const StyledFromBox = styled(StyledLetterPerson)`
  flex-direction: row-reverse;
  display: flex;
  justify-content: space-between;
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
  text-align: center;

  background-attachment: local;
  background-image: repeating-linear-gradient(
    #00000000,
    #00000000 1.8rem,
    #ccc 1.8rem,
    #ccc 1.9rem,
    #00000000 2rem
  );

  &::-webkit-scrollbar {
    display: none;
  }

  /* 파이어폭스 */
  scrollbar-width: none;

  /* 인터넷 익스플로러, 엣지 */
  -ms-overflow-style: none;
`;

const InputSnowball = () => {
  const [wordCount, setWordCount] = useState(0);
  const { setSnowballName } = useContext(DecoContext);
  const maxNameCount = 10;

  const wordLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target;
    if (text.value.length > maxNameCount) {
      text.value = text.value.substring(0, maxNameCount);
    }
    setSnowballName(text.value);
    setWordCount(text.value.length);
  };

  return (
    <StyledLetterBox>
      <StyledInputBox>
        <StyledTextArea
          rows={1}
          onChange={wordLength}
          placeholder="스노우볼 제목을 지어주세요."
        />
      </StyledInputBox>

      <StyledFromBox>{`${wordCount} / 10`}</StyledFromBox>
    </StyledLetterBox>
  );
};

export default InputSnowball;
