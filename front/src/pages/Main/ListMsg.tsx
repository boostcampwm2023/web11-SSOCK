// import styled from 'styled-components';
// import mock from '../../mockdata.json'; // temporary
// import { Msg } from '../../components';
// import Snowball from './../Make/Snowball/Snowball';
import { Prev } from '../../components';

interface ListMsgProps {
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface Snowball {
//   title: string;
//   private: boolean;
//   main_deco_id: number;
//   created_at: string;
//   message: {
//     message_id: number;
//     deco_id: number;
//     deco_color: string;
//     content: string;
//     sender: string;
//     created_at: string;
//   }[];
// }

// interface SnowballProps {
//   message_id: number;
//   deco_color: string;
//   content: string;
//   sender: string;
// }

// const StyledList = styled.div`
//   pointer-events: auto;
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   width: 100%;
//   top: 10%;
//   height: 85%;
//   overflow-y: scroll;
// `;

const ListMsg = (props: ListMsgProps) => {
  return (
    <>
      <Prev set={props.set} />

      {/* <StyledList>
        {mock.user_data.snowball_list.map((snowball: Snowball) =>
          snowball.message.map(
            ({ message_id, deco_color, content, sender }: SnowballProps) => (
              <Msg
                key={message_id}
                color={deco_color}
                isInput={false}
                content={content}
                sender={sender}
              />
            )
          )
        )}
      </StyledList> */}
    </>
  );
};

export default ListMsg;
