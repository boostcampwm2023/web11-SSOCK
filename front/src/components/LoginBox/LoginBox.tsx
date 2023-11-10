interface socialLogin {
  social: 'Kakao' | 'Naver' | 'Google';
}

const LoginUI = (props: socialLogin) => {
  return <button>{props.social}</button>;
};

const LoginBox = () => {
  return (
    <div>
      <LoginUI social={'Kakao'} />
      <LoginUI social={'Naver'} />
      <LoginUI social={'Google'} />
    </div>
  );
};

export default LoginBox;
