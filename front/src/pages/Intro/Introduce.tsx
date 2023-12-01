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
  height: 60%;
  text-align: center;
  color: ${props => props.theme.colors['--black-primary']};
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.7s;

  @media (min-width: ${props => props.theme.size['--desktop-width']}) {
    width: 600px;
  }
`;

const StyledText = styled.div`
  flex: 9;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  word-break: keep-all;
  font: ${props => props.theme.font['--normal-introduce-font']};
  * {
    pointer-events: all;
  }
`;

const StyledClosed = styled.button`
  flex: 1;
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
        안녕하세요 저희는 쏙입니다. <br /> <br />
        스타 100개 달성 시 <br />
        찬우 제로투 or 슬릭백 10초
      </StyledText>
      <StyledClosed onClick={() => closeIntroduce(props, closeRef)}>
        닫기
      </StyledClosed>
    </StyledIntroduce>
  );
};

export default Introduce;
