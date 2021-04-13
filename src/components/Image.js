import styled from "styled-components";

const Image = () => {
  return (
    <Container>
      <ImgBox />
      <Menu />
    </Container>
  );
};

const Menu = () => {
  return (
    <div style={{ width: "15rem", marginLeft: "2rem" }}>
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ImgBox = styled.div`
  width: 40rem;
  height: 30rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  border-radius: 2rem;
  margin-top: 2rem;
`;

const Box = styled.div`
  width: 100%;
  height: 10rem;
  margin-top: 2rem;
  border-radius: 1rem;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
`;

export default Image;
