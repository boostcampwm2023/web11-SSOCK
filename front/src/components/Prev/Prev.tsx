import styled from 'styled-components';
import theme from '../../utils/theme';
import { useNavigate } from 'react-router-dom';

const StyledPrev = styled.img`
  position: absolute;
  top: 4%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    right: 50%;
    margin-right: 450px;
  }
`;

const Prev = () => {
  const navigate = useNavigate();

  return <StyledPrev src={'/icons/prev.svg'} onClick={() => navigate(-1)} />;
};

export default Prev;
