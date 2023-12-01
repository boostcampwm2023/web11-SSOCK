import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme';

const StyledWrong = styled.div`
  font: ${theme.font['--normal-title-font']};
  position: absolute;
  top: 20%;
  font-size: 60px;
  background: linear-gradient(
      0deg,
      ${theme.colors['--primary-green-primary']} 50%,
      ${theme.colors['--primary-red-primary']} 0
    )
    0 0/4px 50px;
  padding: 10%;
  color: white;
  text-align: center;
`;

const Wrong = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 2000);

  return (
    <StyledWrong>
      WRONG!
      <br />
      <br />
      Redirect to main page.
    </StyledWrong>
  );
};

export default Wrong;
