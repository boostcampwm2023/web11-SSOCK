import { useContext } from 'react';
import styled from 'styled-components';
import { Msg } from '@components';
import { MSG_COLOR } from '@constants';
import { DecoContext } from './DecoProvider';

interface MsgBoxProps {
  isInput: boolean;
}

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  pointer-events: all;
  overflow: scroll;
`;

const MsgBox = ({ isInput }: MsgBoxProps) => {
  const { letterID } = useContext(DecoContext);
  return (
    <MsgContainer>
      <Msg
        to={'받는사람'}
        key={1}
        color={MSG_COLOR[letterID].color}
        isInput={isInput}
        content={''}
        sender={''}
        isDeco={true}
      />
    </MsgContainer>
  );
};

export default MsgBox;
