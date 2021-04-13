import styled from "styled-components";

const Header = () => {
  return <Container></Container>;
};

const Container = styled.div`
  width: 100%;
  height: 4rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
`;

export default Header;
