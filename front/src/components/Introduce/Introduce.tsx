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
  font: ${theme.font['--normal-button-font']};
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
`;

const StyledText = styled.div`
  flex: 9;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  word-break: keep-all;
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

const Introduce = (props: IntroduceProps) => {
  return (
    <StyledIntroduce>
      <StyledText>소개글을 입력해주세요.</StyledText>
      <StyledClosed
        onClick={() => {
          props.view[1](!props.view[0]);
        }}
      >
        닫기
      </StyledClosed>
    </StyledIntroduce>
  );
};

export default Introduce;
