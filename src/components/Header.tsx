import styled from "styled-components";

const Header = () => {
  return <Container>Gif Generator</Container>;
};

const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  font-style: italic;
`;

export default Header;
