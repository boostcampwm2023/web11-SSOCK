import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { theme } from '@utils';
import { useChangePrivate } from '@hooks';
import { SnowBallRecoil } from '@states';

interface LockModalProps {
  toast: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  flag: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  background-color: ${theme.colors['--primary-redp-variant']};
  color: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 80%;

  @media (min-width: ${theme.size['--desktop-min-width']}) {
    width: ${theme.size['--desktop-width']};
  }
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
  font: ${theme.font['--normal-nickname-font']};
  white-space: normal;
  word-break: keep-all;
`;

const SubTitle = styled.div`
  font: ${theme.font['--normal-introduce-font']};
  white-space: normal;
  word-break: keep-all;
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

const LockModal = (props: LockModalProps) => {
  const changePrivate = useChangePrivate();
  const modalRef = useRef<HTMLDivElement>(null);
  const { snowBallData } = useRecoilValue(SnowBallRecoil);
  const privateFlag = snowBallData.is_message_private;

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (
        props.flag &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        props.set(false);
      }
    };

    // 이벤트 리스너를 document 전체에 붙여줌
    document.addEventListener('mousedown', closeModal);

    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  }, []);

  const setPrivate = async () => {
    props.set(false);
    await changePrivate();
    props.toast[1](true);
    setTimeout(() => {
      props.toast[1](false);
    }, 1500);
  };

  const stopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    props.set(false);
  };

  return (
    <>
      {props.flag &&
        createPortal(
          <ModalBackground onClick={() => props.set(false)}>
            <Modal onClick={stopEvent}>
              {privateFlag ? (
                <>
                  <Title>해당 스노우볼을 공개 할까요 ?</Title>
                  <SubTitle>
                    공개한 스노우볼의 메세지는 방문자들도 볼 수 있어요.
                  </SubTitle>
                </>
              ) : (
                <>
                  <Title>해당 스노우볼을 비공개 할까요 ?</Title>
                  <SubTitle>
                    비공개한 스노우볼의 메세지는 방문자에게 보이지 않아요.
                  </SubTitle>
                </>
              )}

              <ButtonWrap>
                <ModalButton>
                  <MButton onClick={setPrivate}>
                    {privateFlag ? '공개' : '비공개'}
                  </MButton>
                </ModalButton>
                <Divider>|</Divider>

                <ModalButton>
                  <MButton onClick={closeModal}>닫기</MButton>
                </ModalButton>
              </ButtonWrap>
            </Modal>
          </ModalBackground>,
          document.body
        )}
    </>
  );
};

export default LockModal;
