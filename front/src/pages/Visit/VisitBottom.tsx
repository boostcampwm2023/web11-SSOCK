import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { theme, Container } from '../../utils';
import { Button } from '../../components';
import { SnowBallContext } from './SnowBallProvider';

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
