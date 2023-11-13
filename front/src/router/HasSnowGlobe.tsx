import React, { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';

const HasSnowGlobe: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (sessionStorage.getItem('스노우볼 만들어야함')) return children;

  // return <Navigate to="/main" />;
  console.log('임시로 스노우볼 유무 확인을 무시합니다.');
  return children;
};

export default HasSnowGlobe;
