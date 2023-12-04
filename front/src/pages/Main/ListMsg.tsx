import styled from 'styled-components';
import { Msg } from '../../components';
import { Prev } from '../../components';

interface ListMsgProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledList = styled.div`
  pointer-events: auto;
  position: absolute;
  width: 100%;
  top: 10%;
  height: 85%;
  overflow-y: scroll;
`;

const StyledListWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ListMsg = (props: ListMsgProps) => {
  return (
    <>
      <Prev set={props.set} />


      <StyledList>
      <StyledListWrap>
        <Msg
          color={'#FF0000'}
          isInput={false}
          content={'test'}
          sender={'sender'}
          to={'to'}
        />
        <Msg
          color={'#FF0000'}
          isInput={false}
          content={'test'}
          sender={'sender'}
          to={'to'}
        />
        <Msg
          color={'#FF0000'}
          isInput={false}
          content={'test'}
          sender={'sender'}
          to={'to'}
        />
        <Msg
          color={'#FF0000'}
          isInput={false}
          content={'test'}
          sender={'sender'}
          to={'to'}
        />
        <Msg
          color={'#FF0000'}
          isInput={false}
          content={'test'}
          sender={'sender'}
          to={'to'}
        />
      </StyledListWrap>
      </StyledList>
    </>
  );
};

export default ListMsg;
