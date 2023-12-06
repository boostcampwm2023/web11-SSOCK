import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { theme } from '@utils';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// StylishCircle 스타일드 컴포넌트 생성
const StylishCircle = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #3498db;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to right, #ffffff, #e34b4b);
  animation: ${spin} 2s linear infinite;
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledLoadingText = styled.div`
  font-size: 3rem;
  color: ${theme.colors['--white-primary']};
  font: ${theme.font['--normal-introduce-font']};
`;

const Loading = () => {
  const [dots, setDots] = useState('');
  // 이거 안먹힘 song 수정해야할듯
  // const a = document.getElementById('musicController');
  // console.log(a);
  // if (a) {
  //   a.style.display = 'none';
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500); // 500ms 마다 점을 추가하거나 초기화

    return () => clearInterval(interval);
  }, []);

  return (
  <StyledLoading>
    <StylishCircle />
    <StyledLoadingText>Loading{dots}</StyledLoadingText>
  </StyledLoading>
  );
};

export default Loading;
