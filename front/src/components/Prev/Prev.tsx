import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MessageRecoil, PrevRecoil } from '@states';

interface PrevProps {
  set: React.Dispatch<React.SetStateAction<boolean>> | 'Canvas' | null;
}

const StyledPrev = styled.img`
  position: fixed;
  top: 3.5rem;
  z-index: 100;
`;

const Prev = (props: PrevProps) => {
  const navigate = useNavigate();
  const resetMessage = useResetRecoilState(MessageRecoil);
  const [prevBox, setPrevBox] = useRecoilState(PrevRecoil);

  return (props.set === 'Canvas' && prevBox.view) || props.set !== 'Canvas' ? (
    <StyledPrev
      id="prevBtn"
      src={'/icons/prev.svg'}
      onClick={() => {
        resetMessage();
        props.set
          ? props.set === 'Canvas'
            ? setPrevBox(prev => ({ ...prev, view: false }))
            : props.set(false)
          : navigate(-1);
      }}
    />
  ) : null;
};

export default Prev;
