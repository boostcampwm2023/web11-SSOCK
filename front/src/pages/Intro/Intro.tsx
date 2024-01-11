import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { SnowGlobeCanvas, UIContainer } from '@components';
import { Message, MessageListRecoil } from '@states';
import mockData from '@mock';
import IntroButtonBox from './IntroButtonBox';
import MsgBox from './MsgBox';

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
  const [cookie] = useCookies(['loggedin']);
  const setMessageList = useSetRecoilState(MessageListRecoil);

  useEffect(() => {
    setMessageList(mockData.snowball_data.message_list as Array<Message>);
    cookie.loggedin ? navigate('/main') : null;
  }, [setMessageList, navigate]);

  return (
    <>
      <SnowGlobeCanvas snowBallData={mockData.snowball_data} />
      <UIContainer>
        <TitleDiv>
          <span>스노우볼 속 내 마음</span>
        </TitleDiv>
        <MsgBox />
        <IntroButtonBox />
      </UIContainer>
    </>
  );
};

export default Intro;
