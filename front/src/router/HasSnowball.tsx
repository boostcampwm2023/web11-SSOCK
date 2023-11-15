import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const HasSnowball: React.FC<{ children: ReactNode }> = ({ children }) => {
  const nickname = false; // 닉네임 설정유무 판단

  console.log('임시로 별명, 스노우볼 유무 확인을 무시합니다.');
  if (!nickname) return children;
  if (sessionStorage.getItem('스노우볼 만들어야함'))
    return <Navigate to="/make/snowball" />;
};

export default HasSnowball;
