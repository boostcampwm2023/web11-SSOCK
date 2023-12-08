import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import styled from 'styled-components';
import { SnowGlobeCanvas, UIContainer } from '@components';
import mockData from '@mock';
import IntroButtonBox from './IntroButtonBox';
import MsgBox from './MsgBox';
import { MessageListContext, Message } from '@pages/Visit/MessageListProvider';
import { MessageProvider } from '@pages/Visit/MessageProvider';

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 10rem;
  text-align: center;
  color: ${props => props.theme.colors['--primary-yellow']};
  font: ${props => props.theme.font['--normal-title-font']};
`;

const Intro = () => {
  const navigate = useNavigate();
  const { setMessageList } = useContext(MessageListContext);

  useEffect(() => {
    setMessageList(mockData.snowball_data.message_list as Array<Message>);
    cookie.load('access_token') ? navigate('/main') : null;
  }, [setMessageList]);

  return (
    <>
      <MessageProvider>
        <SnowGlobeCanvas snowBallData={mockData.snowball_data} />
        <UIContainer>
          <TitleDiv>
            <span>스노우볼 속 내마음</span>
          </TitleDiv>
          <MsgBox />
          <IntroButtonBox />
        </UIContainer>
      </MessageProvider>
    </>
  );
};

export default Intro;
