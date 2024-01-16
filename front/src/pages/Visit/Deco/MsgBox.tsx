import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SnowBallRecoil, VisitDecoRecoil } from '@states';
import { Msg } from '@components';
import { MSG_COLOR } from '@constants';

interface MsgBoxProps {
  isInput: boolean;
}

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  pointer-events: auto;
  overflow: scroll;

  @media (max-height: ${props => props.theme.size['--message-min-height']}) {
    position: absolute;
    top: 10%;
    height: 50%;
    * {
      overflow: scroll;
    }
  }
`;

const MsgBox = ({ isInput }: MsgBoxProps) => {
  const { letterID } = useRecoilValue(VisitDecoRecoil);
  const { userData } = useRecoilValue(SnowBallRecoil);
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
