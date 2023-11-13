import { useState } from 'react';
import Name from './Name';
import MakeSnowball from './MakeSnowball';

const Make = () => {
  const [nickname, setNickname] = useState(false); // 닉네임 설정유무 판단 필요(닉네임 설정하고 스노우볼은 설정 안했다던지 등등..)

  return (
    <>{nickname ? <MakeSnowball /> : <Name set={[nickname, setNickname]} />}</>
  );
};

export default Make;
