import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary

interface MsgProps {
  elems: Array<string>;
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

const MsgBox = (props: MsgProps) => {
  const userName = mock.user_name;

  return (
    <StyledLetterBox color={props.elems[0]}>
      <StyledLetterPerson>
        To. <StyledTo>{userName}</StyledTo>
      </StyledLetterPerson>

      <StyledLetterContent>{props.elems[1]}</StyledLetterContent>

      <StyledFromBox>
        From. <StyledFrom>{props.elems[2]}</StyledFrom>
      </StyledFromBox>
    </StyledLetterBox>
  );
};

const ListMsg = () => {
  return (
    <StyledList>
      {mock.snowball.map(snowball =>
        snowball.message.map(elem => (
          <MsgBox
            key={elem.message_id}
            elems={[elem.deco_color, elem.content, elem.sender]}
          />
        ))
      )}
    </StyledList>
  );
};

export default ListMsg;
