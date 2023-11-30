import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';

const BoostcampWrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const BoostcampDiv = styled.div`
  position: absolute;
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 5%;
  gap: 1.5rem;
`;

const BoostcampProject = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1%;
  width: 90%;
  height: 150px;
  background-color: #fff;
  opacity: 0.8;
  border-radius: 20px;
  padding: 1%;
`;

const BoostcampProjectImage = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const BoostcampProjectTitle = styled.h1`
  font-family: ${theme.font['--normal-title-font']};
`;

const BoostcampProjectText = styled.p`
  font-family: ${theme.font['--normal-introduce-font']};
`;



const updateFlakes = (ctx: CanvasRenderingContext2D, flakes: Flake[]) => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = 'hsla(242, 95%, 3%, 1)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  flakes.forEach((flake) => {
    flake.t += 0.05;
    flake.t = flake.t >= Math.PI * 2 ? 0 : flake.t;
    flake.y += flake.sp;
    flake.x += Math.sin(flake.t * 1) * (flake.sz * 0.3);

    if (flake.y > window.innerHeight + 50) flake.y = -10 - Math.random() * 20;
    if (flake.x > window.innerWidth + 20) flake.x = -20;
    if (flake.x < -20) flake.x = window.innerWidth + 20;
    flake.draw(ctx);
  });

  requestAnimationFrame(() => updateFlakes(ctx, flakes));
}

class Flake {
  x: number;
  y: number;
  sz: number;
  sp: number;
  t: number;

  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * (window.innerHeight + 50);
    this.sz = (100 / (10 + Math.random() * 100)) * 0.8;
    this.sp = Math.pow(this.sz * 0.8, 2) * 0.15 * 0.5;
    this.sp = this.sp < 1 ? 1 : this.sp;
    this.t = Math.random() * (Math.PI * 2);
  }

  draw (ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz + 8);
    gradient.addColorStop(0, 'hsla(255,255%,255%,1)');
    gradient.addColorStop(1, 'hsla(255,255%,255%,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

const Boostcamp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flakes: Flake[] = [];
    const num = 150;
    for (let i = 0; i < num; i++) {
      flakes.push(new Flake());
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    updateFlakes(ctx, flakes);
  }, []);

  return (
    <BoostcampWrapper>
      <canvas style={{ pointerEvents: 'none', position: 'absolute'}} ref={canvasRef} />
      <BoostcampDiv>
        

        <BoostcampProject>
          <BoostcampProjectImage src="/img/tempThumbnail.png" />
          <BoostcampProjectTitle>내 마음 속 스노우볼</BoostcampProjectTitle>
          <BoostcampProjectText>내 마음 속 스노우볼을 꾸며보세요 !!</BoostcampProjectText>
        </BoostcampProject>
        <BoostcampProject>
          <BoostcampProjectImage src="/img/tempThumbnail.png" />
          <BoostcampProjectTitle>내 마음 속 스노우볼</BoostcampProjectTitle>
          <BoostcampProjectText>내 마음 속 스노우볼을 꾸며보세요 !!</BoostcampProjectText>
        </BoostcampProject>
        <BoostcampProject>
          <BoostcampProjectImage src="/img/tempThumbnail.png" />
          <BoostcampProjectTitle>내 마음 속 스노우볼</BoostcampProjectTitle>
          <BoostcampProjectText>내 마음 속 스노우볼을 꾸며보세요 !!</BoostcampProjectText>
        </BoostcampProject>


      </BoostcampDiv>
    </BoostcampWrapper>
  );
};

export default Boostcamp;
