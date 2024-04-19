import styled from 'styled-components';
import { DeleteModal } from '@components';

interface MsgResponse {
  user_id: number;
  snowball_id: number;
  location: number;
  content: string;
  sender: string;
  to: string;
  created: string;
  decoration_id: number;
  decoration_color: string;
  id: number;
  is_deleted: boolean;
  opened: string;
  letter_id: number;
  sentiment: 'positive' | 'neutral' | 'negative'; // temp
  confidence: number; // temp
}

interface MsgProps {
  color: string;
  content: string;
  sender: string;
  to: string;
  messageId: number;
  arr: Array<MsgResponse>;
  set: React.Dispatch<React.SetStateAction<Array<MsgResponse>>>;
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
  pointer-events: all;
`;

const StyledToWrap = styled.div``;

const ListMsg = (props: MsgProps): JSX.Element => {
  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        <StyledToWrap>
          To. <StyledTo>{props.to}</StyledTo>
        </StyledToWrap>
        <DeleteModal
          arr={props.arr}
          set={props.set}
          message={props.messageId}
        />
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
