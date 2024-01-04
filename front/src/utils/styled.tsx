import styled from 'styled-components';
import theme from './theme';

const CanvasContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors['--primary-black']};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 10rem;
  gap: 1rem;
`;

const LongButton = styled.button`
  font: ${theme.font['--normal-button-font']};
  border-radius: 0.625rem;
  width: 66.6667%;
  height: 3rem;
  padding: 0.625rem;
  margin: 0.25rem;
  color: white;
  border: 1px solid ${theme.colors['--white-primary']};
`;

const BlurBody = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 0.2);
  pointer-events: all;
`;

export { CanvasContainer, Container, LongButton, BlurBody };
