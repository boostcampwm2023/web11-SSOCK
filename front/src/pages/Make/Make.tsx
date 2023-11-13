import { useState } from 'react';
import Name from './Name';

const Make = () => {
  const [nickname, setNickname] = useState(false);

  return (
    <>{nickname ? <div>Hello</div> : <Name set={[nickname, setNickname]} />}</>
  );
};

export default Make;
