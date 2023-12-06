import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';

interface MsgProps {
  color: string;
  content: string;
  sender: string;
  to: string;
  messageId: number;
}

interface MsgColor {
  color: string;
}

const StyledLetterBox = styled.div<MsgColor>`
  width: 80%;
  display: flex;
  align-self: center;
  font: ${props => props.theme.font['--normal-introduce-font']};
  text-shadow: ${props => props.theme.font['--text-shadow']};
  flex-direction: column;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${props => props.color + '80'};
  margin: 1rem;
`;

const StyledLetterPerson = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
`;

const StyledTo = styled.span`
  color: ${props => props.theme.colors['--nick-name']};
`;

const StyledLetterContent = styled.div`
  white-space: normal;
  text-align: center;
  color: white;
`;

const StyledFromBox = styled(StyledLetterPerson)`
  flex-direction: row-reverse;
  display: flex;
  justify-content: space-between;
`;

const StyledFrom = styled.span`
  text-align: right;
  color: ${props => props.theme.colors['--primary-redp-variant']};
`;

const StyledFromInput = styled.input`
  width: 55%;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors['--nick-name']};
  text-shadow: ${props => props.theme.font['--text-shadow']};
  font-size: 1rem;
  font-weight: 700;
  pointer-events: stroke;
`;

const StyledToWrap = styled.div``;

const StyledDeleteButton = styled.button`
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: gray;
`;

const ListMsg = (props: MsgProps): JSX.Element => {
  const navigate = useNavigate();
  const { setSnowBallData, setUserData } = useContext(SnowBallContext);

  const deleteMsg = () => {
    axios
      .delete(`/api/message/${props.messageId}`, {
        withCredentials: true
      })
      .then(() => {
        axios
          .get('/api/user', { withCredentials: true })
          .then(res => {
            const userData = res.data.user as UserData;
            const snowballData = res.data.main_snowball as SnowBallData;
            setSnowBallData(snowballData);
            setUserData(userData);
          })
          .catch(e => {
            console.error(e);
            navigate('*');
          });
      }) // 여기가 지금 좀 맘에안듬 민아가 코딩을 안해요
      .catch(e => {
        console.error(e);
        navigate('*');
      });
  };

  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        <StyledToWrap>
          To. <StyledTo>{props.to}</StyledTo>
        </StyledToWrap>
        <StyledDeleteButton onClick={deleteMsg}>Delete</StyledDeleteButton>
      </StyledLetterPerson>

      <StyledLetterContent>{props.content}</StyledLetterContent>

      <StyledFromBox>
        <StyledFrom>
          From.
          <StyledFromInput value={props.sender} disabled />
        </StyledFrom>
      </StyledFromBox>
    </StyledLetterBox>
  );
};

export default ListMsg;
