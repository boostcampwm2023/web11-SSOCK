import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MakeDecoRecoil } from '@states';
import { Msg } from '@components';
import { MSG_COLOR } from '@constants';

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
  const { letterID } = useRecoilValue(MakeDecoRecoil);
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
