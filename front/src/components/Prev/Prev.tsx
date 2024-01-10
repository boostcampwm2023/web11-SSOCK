import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MessageRecoil } from '@states';
import { PrevContext } from '@components/SnowGlobeCanvas/PrevProvider';

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
  const { view, setView } = useContext(PrevContext);
  const resetMessage = useResetRecoilState(MessageRecoil);

  return (props.set === 'Canvas' && view) || props.set !== 'Canvas' ? (
    <StyledPrev
      id="prevBtn"
      src={'/icons/prev.svg'}
      onClick={() => {
        resetMessage();
        props.set
          ? props.set === 'Canvas'
            ? setView(false)
            : props.set(false)
          : navigate(-1);
      }}
    />
  ) : null;
};

export default Prev;
