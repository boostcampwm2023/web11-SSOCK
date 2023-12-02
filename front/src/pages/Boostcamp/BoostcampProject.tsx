import styled from 'styled-components';

interface BoostcampProps {
  img: string;
  title: string;
  text: string;
}

const BoostcampProjectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1%;
  width: 95%;
  height: auto;
  background-color: #fff;
  opacity: 0.8;
  border-radius: 1.25rem;
  padding: 1%;
`;

const BoostcampProjectImage = styled.img`
  width: 30%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
`;

const BoostcampTextBox = styled.div`
  width: 70%;
  padding: 2%;
`;

const BoostcampProjectTitle = styled.h1`
  font: ${props => props.theme.font['--normal-introduce-font']};
`;

const BoostcampProjectText = styled.p`
  font: ${props => props.theme.font['--normal-main-header-font']};
  word-break: keep-all;
  white-space: wrap;
`;

const BoostcampProject = (props: BoostcampProps) => {
  return (
    <BoostcampProjectBox>
      <BoostcampProjectImage src={props.img} />
      <BoostcampTextBox>
        <BoostcampProjectTitle>{props.title}</BoostcampProjectTitle>
        <BoostcampProjectText>{props.text}</BoostcampProjectText>
      </BoostcampTextBox>
    </BoostcampProjectBox>
  );
};

export default BoostcampProject;
