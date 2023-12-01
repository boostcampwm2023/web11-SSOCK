import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../utils';
import { Button } from '../../components';

const Container = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VisitBottom = () => {
  const navigate = useNavigate();
  const { user } = useParams();
  const [write, setWrite] = useState(false);

  useEffect(() => {
    write ? navigate(`./deco`) : null;
  }, [write, user, navigate]);

  return (
    <Container>
      <Button
        text={'스노우볼 꾸미고 편지남기기'}
        color={theme.colors['--primary-red-primary']}
        view={[write, setWrite]}
      />
    </Container>
  );
};

export default VisitBottom;
