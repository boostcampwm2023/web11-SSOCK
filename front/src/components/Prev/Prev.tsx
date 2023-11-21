import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { PrevContext } from '../SnowGlobeCanvas/PrevProvider';

interface PrevProps {
  set: React.Dispatch<React.SetStateAction<boolean>> | 'Canvas' | null;
}

const StyledPrev = styled.img`
  position: absolute;
  top: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    right: 50%;
    margin-right: 450px;
  }
`;

const Prev = (props: PrevProps) => {
  const navigate = useNavigate();
  const { view } = useContext(PrevContext);

  return (props.set === 'Canvas' && view) || props.set !== 'Canvas' ? (
    <StyledPrev
      src={'/icons/prev.svg'}
      onClick={() => {
        props.set
          ? props.set === 'Canvas'
            ? console.log('canvas back button')
            : props.set(false)
          : navigate(-1);
      }}
    />
  ) : null;
};

export default Prev;
