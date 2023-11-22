import { useContext } from 'react';
import { MessageContext } from './MessageProvider';
import { Msg } from '../../components';

const VisitBody = () => {
  const { message, sender, color } = useContext(MessageContext); // message가 '' 비어있지 않을때

  return (
    <>
      {message !== '' ? (
        <Msg color={color} isInput={false} content={message} sender={sender} />
      ) : null}
    </>
  );
};

export default VisitBody;
