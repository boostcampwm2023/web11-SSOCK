import { useState, useRef, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '@utils';
import {
  SnowBallContext,
  UserData,
  SnowBallData
} from '@pages/Visit/SnowBallProvider';

interface DeleteModalProps {
  message: number;
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Text = styled.div`
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: gray;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${theme.colors['--primary-redp-variant']};
  color: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  font: ${theme.font['--normal-title-font']};
`;

const SubTitle = styled.div`
  font: ${theme.font['--normal-introduce-font']};
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid white;
  padding-top: 1rem;
`;

const ModalButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Divider = styled.div`
  height: 100%;
  width: 1rem;
  color: white;
`;

const MButton = styled.button`
  font: ${theme.font['--normal-button-font']};
`;

const DeleteModal = (props: DeleteModalProps) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (
        isModalOpened &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsModalOpened(false);
      }
    };

    // 이벤트 리스너를 document 전체에 붙여줌
    document.addEventListener('mousedown', closeModal);

    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, [isModalOpened]);

  const navigate = useNavigate();
  const { setSnowBallData, setUserData } = useContext(SnowBallContext);

  const deleteMsg = () => {
    setIsModalOpened(false);
    axios
      .delete(`/api/message/${props.message}`, {
        withCredentials: true
      })
      .then(() => {
        axios
          .get('/api/user', { withCredentials: true })
          .then(res => {
            const userData = res.data.user as UserData;
            const snowballData = res.data.main_snowball as SnowBallData;
            setSnowBallData(snowballData);
            setUserData(userData);
          })
          .catch(e => {
            console.error(e);
            navigate('*');
          });
      })
      .catch(e => {
        console.error(e);
        navigate('*');
      });
  };

  const stopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <Button onClick={() => setIsModalOpened(true)}>
        <Text>Delete</Text>
      </Button>

      {isModalOpened &&
        createPortal(
          <ModalBackground onClick={() => setIsModalOpened(false)}>
            <Modal onClick={stopEvent}>
              <Title>편지를 삭제할까요 ?</Title>
              <SubTitle>삭제된 편지는 복구할 수 없어요 😭 </SubTitle>
              <ButtonWrap>
                <ModalButton>
                  <MButton onClick={deleteMsg}>삭제</MButton>
                </ModalButton>
                <Divider>|</Divider>
                <ModalButton>
                  <MButton onClick={() => setIsModalOpened(false)}>
                    취소
                  </MButton>
                </ModalButton>
              </ButtonWrap>
            </Modal>
          </ModalBackground>,
          document.body
        )}
    </>
  );
};

export default DeleteModal;
