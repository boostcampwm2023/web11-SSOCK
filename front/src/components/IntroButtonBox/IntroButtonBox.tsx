import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { Button } from '../Button';

const ButtonBox = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  align-items: center;
  margin: auto;
`;

const IntroButtonBox = () => {
  const [isIntroduce, setIsIntroduce] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <ButtonBox>
        <Button
          text={'소개페이지'}
          color={theme.colors['--primary-red-primary']}
          view={[isIntroduce, setIsIntroduce]}
        />
        <Button
          text={'로그인'}
          color={theme.colors['--primary-green-primary']}
          view={[isLogin, setIsLogin]}
        />
      </ButtonBox>

      {isIntroduce ? <div>Introduce</div> : isLogin ? <div>Login</div> : null}
    </>
  );
};

export default IntroButtonBox;
