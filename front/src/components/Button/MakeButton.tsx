import styled from 'styled-components';
import theme from '../../utils/theme';
import { useState, useContext } from 'react';
import { DecoContext } from '../../pages/Make/MainDeco/DecoProvider';
import axios from 'axios';

interface MakeButtonProps {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
}

const StyledButton = styled.button<MakeButtonProps>`
  background-color: ${props => props.color};
  font: ${theme.font['--normal-button-font']};
  border-radius: 10px;
  width: 66.6667%;
  height: 3rem;
  padding: 0.625rem;
  margin: 0.25rem;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};

  @media (min-width: ${theme.size.maxWidth}) {
    width: 600px;
  }
`;

const PostButtonWrap = styled.div`
  width: 100%;
`;

const StyledAlert = styled.div`
  color: ${theme.colors['--white-primary']};
  padding-bottom: 1rem;
  font: ${theme.font['--normal-introduce-font']};
`;

const MakeButton = (props: ButtonProps) => {
  const { snowballName, mainDecoID, mainColor, bottomID, bottomColor } =
    useContext(DecoContext);
  const [alert, setAlert] = useState(false);

  const ClickedMake = () => {
    if (snowballName === '') {
      setAlert(true);
      return;
    }

    const snowballInfo = {
      title: snowballName,
      main_decoration_id: mainDecoID,
      main_decoration_color: mainColor,
      bottom_decoration_id: bottomID,
      bottom_decoration_color: bottomColor,
      is_message_private: false
    };

    axios
      .post('/api/snowball', snowballInfo, { withCredentials: true })
      .then(res => {
        console.log(res);
      });

    props.view[1](!props.view[0]);
    props.visible[1](-1);
  };

  return (
    <>
      <PostButtonWrap>
        {alert ? (
          <StyledAlert>스노우볼 이름을 입력해주세요 !</StyledAlert>
        ) : null}
        <StyledButton color={props.color} onClick={ClickedMake}>
          {props.text}
        </StyledButton>
      </PostButtonWrap>
    </>
  );
};

export default MakeButton;
