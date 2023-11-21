import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { Button } from '../../components';
import { MessageContext } from './MessageProvider';
import { Msg } from '../../components';

const StyledButtonBox = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 36px;
  align-items: center;
  margin: auto;
`;

const VisitButton = () => {
  const navigate = useNavigate();
  const { user } = useParams();
  const [write, setWrite] = useState(false);
  const { message, sender, color } = useContext(MessageContext); // message가 '' 비어있지 않을때

  useEffect(() => {
    write ? navigate(`./deco`) : null;
  }, [write, user, navigate]);

  return (
    <StyledButtonBox>
      {message !== '' ? (
        <Msg color={color} isInput={false} content={message} sender={sender} />
      ) : null}

      <Button
        text={'스노우볼 꾸미고 편지남기기'}
        color={theme.colors['--primary-red-primary']}
        view={[write, setWrite]}
      />
    </StyledButtonBox>
  );
};

export default VisitButton;
