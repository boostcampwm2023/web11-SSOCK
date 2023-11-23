import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { SnowGlobeCanvas } from '../../components';
import MainButtonBox from './MainButtonBox';
import { UIContainer } from '../../components/UIContainer';

const StyledLeft = styled.img`
  position: fixed;
  top: 50%;
  height: 4rem;
`;

const StyledRight = styled(StyledLeft)`
  right: 0;
`;

const Main = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const allSnowballIdx = 5; // fetch 필요
  const [snowballIdx, setSnowballIdx] = useState(1);

  useEffect(() => {
    if (
      !searchParams.size ||
      searchParams.get('snowball') !== String(snowballIdx)
    ) {
      navigate('/main?snowball=1');
      setSnowballIdx(1);
      searchParams.set('snowball', '1');
      setSearchParams(searchParams);
    }

    console.log(`fetch ${searchParams.get('snowball')}`); // fetch snowball
  }, [searchParams, setSearchParams, navigate, snowballIdx]);

  const moveSnowball = (where: 'prev' | 'next') => {
    const nowIdx = where === 'prev' ? snowballIdx - 1 : snowballIdx + 1;
    setSnowballIdx(nowIdx);
    searchParams.set('snowball', `${nowIdx}`);
    setSearchParams(searchParams);
  };

  return (
    <>
      <SnowGlobeCanvas />

      <UIContainer>
        {snowballIdx > 1 ? (
          <StyledLeft
            src={'/icons/prev.svg'}
            onClick={() => moveSnowball('prev')}
          />
        ) : null}

        {snowballIdx < allSnowballIdx ? (
          <StyledRight
            src={'/icons/next.svg'}
            onClick={() => moveSnowball('next')}
          />
        ) : null}

        <MainButtonBox />
      </UIContainer>
    </>
  );
};

export default Main;
