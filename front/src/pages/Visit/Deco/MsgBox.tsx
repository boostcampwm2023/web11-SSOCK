import { useContext } from 'react';
import styled from 'styled-components';
import { Msg } from '@components';
import { MSG_COLOR } from '@constants';
import { DecoContext } from './DecoProvider';
import { SnowBallContext } from '../SnowBallProvider';

interface MsgBoxProps {
  isInput: boolean;
}

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  pointer-events: auto;
  overflow: scroll;

  @media (max-height: ${props => props.theme.size['--desktop-max-height']}) {
    position: absolute;
    top: 10%;
    height: 50%;
    * {
      overflow: scroll;
    }
  }
`;

const MsgBox = ({ isInput }: MsgBoxProps) => {
  const { letterID } = useContext(DecoContext);
  const { userData } = useContext(SnowBallContext);
  return (
    <MsgContainer>
      <Msg
        to={userData.nickname}
        key={1}
        color={MSG_COLOR[letterID].color}
        isInput={isInput}
        content={''}
        sender={'익명'}
        isDeco={true}
      />
    </MsgContainer>
  );
};

export default MsgBox;
