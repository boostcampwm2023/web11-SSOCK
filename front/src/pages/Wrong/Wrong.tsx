import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrong = styled.div`
  font: ${props => props.theme.font['--normal-title-font']};
  position: absolute;
  top: 20%;
  font-size: 50px;
  background: linear-gradient(
      0deg,
      ${props => props.theme.colors['--primary-green-primary']} 50%,
      ${props => props.theme.colors['--primary-red-primary']} 0
    )
    0 0/4px 50px;
  padding: 10%;
  color: white;
  text-align: center;
  width: 100%;
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
      Redirect to
      <br />
      main page.
    </StyledWrong>
  );
};

export default Wrong;
