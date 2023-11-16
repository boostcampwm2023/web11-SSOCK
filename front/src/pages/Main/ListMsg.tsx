import styled from 'styled-components';
import mock from '../../mockdata.json'; // temporary
import { Msg } from '../../components';

interface Snowball {
  title: string;
  private: boolean;
  main_deco_id: string;
  created_at: string;
  message: {
    message_id: number;
    deco_id: number;
    deco_color: string;
    content: string;
    sender: string;
    created_at: string;
  }[];
}

const StyledList = styled.div`
  position: absolute;
  width: 100%;
  top: 10%;
  height: 85vh;
  overflow: scroll;
`;

const ListMsg = () => {
  return (
    <StyledList>
      {mock.snowball.map((snowball: Snowball) =>
        snowball.message.map(elem => (
          <Msg
            key={elem.message_id}
            elems={[elem.deco_color, 'Not', elem.content, elem.sender]}
          />
        ))
      )}
    </StyledList>
  );
};

export default ListMsg;
