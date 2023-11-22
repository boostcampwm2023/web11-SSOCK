import { useContext } from 'react';
import { DecoContext } from './DecoProvider';
import styled from 'styled-components';

const StyledDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;
const TestBtn = () => {
  const { decoID, setDecoID } = useContext(DecoContext);
  const { color, setColor } = useContext(DecoContext);
  return (
    <StyledDiv>
      <button
        onClick={() => {
          0;
          setDecoID((decoID + 1) % 3);
        }}
      >
        {decoID},{color}
      </button>
      <input
        type="color"
        value={color}
        onChange={e => {
          console.log(e.target.value);
          setColor(e.target.value);
        }}
      ></input>
    </StyledDiv>
  );
};
export default TestBtn;
