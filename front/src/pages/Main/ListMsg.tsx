import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary

interface MsgDetail {
  color: string;
  content: string;
  sender: string;
}

interface MsgColor {
  color: string;
}

const StyledLetterBox = styled.div<MsgColor>`
  font: ${theme.font['--normal-introduce-font']};
  border-radius: 16px;
  padding: 16px;
  background-color: ${props => props.color + '4D'};
  margin: 10px;
`;

const StyledLetterPerson = styled.div`
  color: white;
`;

const StyledTo = styled.span`
  color: ${theme.colors['--nick-name']};
`;

const StyledLetterContent = styled.div`
  color: white;
  margin: 30px 0;
`;

const StyledFromBox = styled(StyledLetterPerson)`
  text-align: right;
`;

const StyledFrom = styled.span`
  color: ${theme.colors['--primary-redp-variant']};
`;

const StyledList = styled.div`
  position: absolute;
  width: 100%;
  top: 10%;
  height: 85vh;
  overflow: scroll;
`;

const MsgBox = (props: MsgDetail) => {
  const userName = mock.user_name;

  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        To. <StyledTo>{userName}</StyledTo>
      </StyledLetterPerson>

      <StyledLetterContent>{props.content}</StyledLetterContent>

      <StyledFromBox>
        From. <StyledFrom>{props.sender}</StyledFrom>
      </StyledFromBox>
    </StyledLetterBox>
  );
};

const ListMsg = () => {
  return (
    <StyledList>
      {mock.message.map(elem => {
        return (
          <MsgBox
            key={elem.message_id}
            color={elem.deco_color}
            content={elem.content}
            sender={elem.sender}
          />
        );
      })}
    </StyledList>
  );
};

export default ListMsg;
