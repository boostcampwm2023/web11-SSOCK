import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary

interface MsgProps {
  color: string;
  isInput: boolean;
  content: string;
  sender: string;
}

interface MsgColor {
  color: string;
}

const StyledLetterBox = styled.div<MsgColor>`
  width: 80%;
  display: flex;
  align-self: center;
  font: ${theme.font['--normal-introduce-font']};
  flex-direction: column;
  border-radius: 1rem;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${props => props.color + '80'};
  margin: 1rem;
`;

const StyledLetterPerson = styled.div`
  text-align: left;
  color: white;
`;

const StyledTo = styled.span`
  color: ${theme.colors['--nick-name']};
`;

const StyledLetterContent = styled.div`
  text-align: center;
  color: white;
`;

const StyledFromBox = styled(StyledLetterPerson)`
  text-align: right;
`;

const StyledFrom = styled.span`
  color: ${theme.colors['--primary-redp-variant']};
`;

const StyledInputBox = styled.div`
  display: flex;
  width: 100%;
`;

const Msg = (props: MsgProps) => {
  const userName = mock.user_name;
  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        To. <StyledTo>{userName}</StyledTo>
      </StyledLetterPerson>

      {props.isInput ? (
        <StyledInputBox>
          <input type="text" />
        </StyledInputBox>
      ) : (
        <StyledLetterContent>{props.content}</StyledLetterContent>
      )}

      <StyledFromBox>
        From.&nbsp;
        <StyledFrom>
          {props.sender === '' ? <input type="text" /> : props.sender}
        </StyledFrom>
      </StyledFromBox>
    </StyledLetterBox>
  );
};

export default Msg;
