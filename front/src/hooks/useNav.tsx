import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { PrevRecoil } from '@states';

const useNav = () => {
  const navigate = useNavigate();
  const resetPrev = useResetRecoilState(PrevRecoil);

  const customNavigate = (path: string) => {
    resetPrev();
    navigate(path);
  };

  return customNavigate;
};

export default useNav;
