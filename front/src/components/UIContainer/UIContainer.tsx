import styled from 'styled-components';

const UIBoxDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  pointer-events: none;
  * {
    pointer-events: all;
  }
`;

const UIContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <UIBoxDiv>{children}</UIBoxDiv>;
};

export default UIContainer;
