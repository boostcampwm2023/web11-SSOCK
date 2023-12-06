import styled from "styled-components";
import { useContext } from "react";
import { Msg } from "@components";
import { MessageContext } from "../Visit/MessageProvider";
import { SnowBallContext, SnowBallData, UserData } from "../Visit/SnowBallProvider";

const MsgContainer = styled.div`
  max-height: fit-content;
  overflow: scroll;
`;

const MainBody = (): JSX.Element => {
  const { message, sender, color } = useContext(MessageContext);
  const { userData, snowBallData, setSnowBallData } =
    useContext(SnowBallContext);


  return (
    <MsgContainer>
      {message !== '' ? (
        <Msg
          color={color}
          isInput={false}
          sender={sender}
          content={message}
          to={userData.nickname}
          isDeco={false}
        />
      ) : null}
      </MsgContainer>
  );
};

export default MainBody