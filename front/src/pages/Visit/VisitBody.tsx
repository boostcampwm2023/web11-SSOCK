import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { Button } from '../../components';
import { MessageContext } from './MessageProvider';
import { Msg } from '../../components';

const VisitBody = () => {
  const navigate = useNavigate();
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
