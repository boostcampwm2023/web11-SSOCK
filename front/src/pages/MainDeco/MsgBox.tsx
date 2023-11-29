import { useContext } from 'react';
import { DecoContext } from './DecoProvider';
import { MSG_COLOR } from '../../constants/deco';
import { Msg } from '../../components';
import styled from 'styled-components';

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
