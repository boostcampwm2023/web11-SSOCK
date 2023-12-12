import { useRef } from 'react';
import styled from 'styled-components';

interface IntroduceProps {
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledIntroduce = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors['--primary-yellow']};
  border-radius: 1.5rem;
  width: 80%;
  height: 70%;
  text-align: center;
  color: ${props => props.theme.colors['--black-primary']};
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.7s;
  z-index: 10;

  @media (min-width: ${props => props.theme.size['--desktop-width']}) {
    width: 600px;
  }
`;

const StyledText = styled.div`
  height: 90%;
  overflow: scroll;
  padding: 5%;
  font: ${props => props.theme.font['--normal-introduce-font']};
  pointer-events: auto;
  * {
    pointer-events: auto;
  }
`;

const Red = styled.span`
  color: ${props => props.theme.colors['--primary-red-primary']};
`;

const Title = styled(Red)`
  font-weight: bold;
  font-size: 1.35rem;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Section = styled.div`
  white-space: normal;
  word-break: keep-all;
`;

const StyledClosed = styled.button`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${props => props.theme.font['--normal-button-font']};
  font-size: 0.875rem;
  line-height: normal;
`;

const closeIntroduce = (
  props: IntroduceProps,
  closeRef: React.RefObject<HTMLDivElement>
) => {
  const onAnimationEnd = () => {
    if (closeRef.current) {
      props.view[1](!props.view[0]);
      closeRef.current.removeEventListener('animationend', onAnimationEnd);
    }
  };

  if (closeRef.current) {
    closeRef.current.addEventListener('animationend', onAnimationEnd);
    closeRef.current.style.setProperty('animation', 'fadeOut 0.5s forwards');
  }
};

const Introduce = (props: IntroduceProps) => {
  const closeRef = useRef<HTMLDivElement>(null);
  return (
    <StyledIntroduce ref={closeRef}>
      <StyledText>
        <Title>🎅스노우볼 속 내 마음🎅</Title>
        <br />
        <br />

        <Section>
          📌스노우볼은 최대 5️⃣개까지 생성 가능해요👍
          <br />
          📌한 스노우볼에 편지는 최대 30개까지 담겨요💌
        </Section>
        <br />

        <Section>
          <Bold>👆스노우볼 클릭</Bold>
          <br />
          🔺확대한 스노우볼에서는 받은 편지들을&nbsp;
          <Red>장식</Red>으로 확인할 수 있어요🎁
          <br />
          🔺장식 클릭으로 편지를 확인할 수 있어요👀
          <br />
          🔺스노우볼을 다시 작게 보고 싶을 때는 왼쪽 위&nbsp;
          <Red>
            <Bold>&lt;</Bold>
          </Red>
          표시를 눌러주세요🎄
        </Section>
        <br />

        <Section>
          <Bold>❗아직 확인하지 않은 편지</Bold>
          <br />안 읽은 편지들을 확인할 수 있어요☃️
        </Section>
        <br />

        <Section>
          <Bold>🎉편지 AI 감정분석</Bold>
          <br />
          눈과 함께 편지의 감정들이 떨어져요❄️
          <br />
          감정의 크기에 따라 사이즈가 달라요💫
          <br />
          ❤️긍정의 감정이 가득해요😊
          <br />
          ⭐온화한 감정으로 작성됐어요😌
          <br />
          💧슬픈 내용이 들어있어요😢
          <br />
        </Section>
        <br />

        <Section>
          🚨버그 및 신고는
          <br />
          <Bold>kimbukaem@gmail.com</Bold>
          <br />로 부탁드립니다🙇
        </Section>
      </StyledText>

      <StyledClosed onClick={() => closeIntroduce(props, closeRef)}>
        닫기
      </StyledClosed>
    </StyledIntroduce>
  );
};

export default Introduce;
