import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, theme } from '@utils';
import { useNav } from '@hooks';
import { Button } from '@components';

const VisitBottom = () => {
  const navigate = useNav();
  const { user } = useParams();
  const [write, setWrite] = useState(false);

  useEffect(() => {
    write ? navigate('./deco') : null;
  }, [write, user]);

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
