import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrevContext } from '../SnowGlobeCanvas/PrevProvider';

interface PrevProps {
  set: React.Dispatch<React.SetStateAction<boolean>> | 'Canvas' | null;
}

const StyledPrev = styled.img`
  position: fixed;
  top: 3.5rem;
`;

const Prev = (props: PrevProps) => {
  const navigate = useNavigate();
  const { view, setView } = useContext(PrevContext);

  return (props.set === 'Canvas' && view) || props.set !== 'Canvas' ? (
    <StyledPrev
      src={'/icons/prev.svg'}
      onClick={() =>
        props.set
          ? props.set === 'Canvas'
            ? setView(false)
            : props.set(false)
          : navigate(-1)
      }
    />
  ) : null;
};

export default Prev;
