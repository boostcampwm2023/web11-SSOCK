import React, { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';

const IsLogin: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (sessionStorage.getItem('userNum')) return children;
  return children;
};

export default IsLogin;
