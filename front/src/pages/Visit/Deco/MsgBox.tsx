import { useContext } from 'react';
import { DecoContext } from './DecoProvider';
import { MSG_COLOR } from '../../../constants/deco';
import { Msg } from '../../../components';
import styled from 'styled-components';
import { SnowBallContext } from '../SnowBallProvider';

interface MsgBoxProps {
  isInput: boolean;
}

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  pointer-events: all;
  overflow: scroll;
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
        sender={''}
      />
    </MsgContainer>
  );
};

export default MsgBox;
