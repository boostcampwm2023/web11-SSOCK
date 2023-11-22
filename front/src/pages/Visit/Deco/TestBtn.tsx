import { useContext } from 'react';
import { DecoContext } from './DecoProvider';

const TestBtn = () => {
  const { decoID, setDecoID } = useContext(DecoContext);
  const { color, setColor } = useContext(DecoContext);
  return (
    <>
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
    </>
  );
};
export default TestBtn;
