import React, { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';

const IsLogin: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (sessionStorage.getItem('userNum')) return children;

  // alert('이 서비스는 로그인이 필요합니다.');
  // return <Navigate to="/" />;
  console.log('임시로 로그인을 무시합니다.');
  return children;
};

export default IsLogin;
