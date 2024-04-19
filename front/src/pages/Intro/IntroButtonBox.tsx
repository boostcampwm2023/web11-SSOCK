import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@utils';
// prettier-ignore
import { useNav } from '@hooks';
// temp
import { Button } from '@components';
import Introduce from './Introduce';
import LoginBox from './LoginBox';

const StyledButtonBox = styled.div`
  display: flex;
  height: 15rem;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const IntroButtonBox = () => {
  const [isIntroduce, setIsIntroduce] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNav();

  return (
    <>
      {!isIntroduce && !isLogin ? (
        <StyledButtonBox>
          <Button
            text={'소개페이지'}
            color={theme.colors['--primary-red-primary']}
            view={[isIntroduce, setIsIntroduce]}
          />
          <Button
            // text={'로그인'}
            text={'시작하기'}
            color={theme.colors['--primary-green-primary']}
            view={[isLogin, setIsLogin]} // 로그인 기능 임시 제거
            callback={() => {
              // temp
              navigate('/main');
            }}
          />
        </StyledButtonBox>
      ) : null}

      {isIntroduce ? (
        <Introduce view={[isIntroduce, setIsIntroduce]} />
      ) : isLogin ? (
        <LoginBox view={[isLogin, setIsLogin]} />
      ) : null}
    </>
  );
};

export default IntroButtonBox;
