import Header from "components/Header";
import Image from "components/Image";
import styled from "styled-components";

const Index = () => (
  <Container>
    <Header />
    <Image />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Index;
