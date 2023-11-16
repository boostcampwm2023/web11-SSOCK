import { useRef } from 'react';
import theme from '../../utils/theme';
import styled from 'styled-components';

interface IntroduceProps {
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const StyledIntroduce = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: ${theme.colors['--primary-yellow']};
  border-radius: 20px;
  width: 80%;
  height: 60%;
  padding: 10px;
  text-align: center;
  color: ${theme.colors['--black-primary']};
  display: flex;
  flex-direction: column;
  animation: fadein 0.7s;

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
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
  font: ${theme.font['--normal-introduce-font']};
`;

const StyledClosed = styled.button`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${theme.font['--normal-button-font']};
  font-size: 14px;
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
    closeRef.current.style.setProperty('animation', 'fadeout 0.5s forwards');
  }
};

const Introduce = (props: IntroduceProps) => {
  const closeRef = useRef<HTMLDivElement>(null);

  return (
    <StyledIntroduce ref={closeRef}>
      <StyledText>소개글을 입력해주세요.</StyledText>
      <StyledClosed onClick={() => closeIntroduce(props, closeRef)}>
        닫기
      </StyledClosed>
    </StyledIntroduce>
  );
};

export default Introduce;
