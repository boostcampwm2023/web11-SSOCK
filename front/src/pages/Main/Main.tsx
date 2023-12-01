import { useState, useEffect, useRef } from 'react';
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

  const leftArrowRef = useRef<HTMLImageElement>(null);
  const rightArrowRef = useRef<HTMLImageElement>(null);

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
            ref={leftArrowRef}
            src={'/icons/prev.svg'}
            onClick={() => moveSnowball('prev')}
          />
        ) : null}

        {snowballIdx < allSnowballIdx ? (
          <StyledRight
            ref={rightArrowRef}
            src={'/icons/next.svg'}
            onClick={() => moveSnowball('next')}
          />
        ) : null}

        <MainButtonBox leftArrow={leftArrowRef} rightArrow={rightArrowRef} />
      </UIContainer>
    </>
  );
};

export default Main;
