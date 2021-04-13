import styled from "styled-components";
import Header from "./components/Header";
import Image from "./components/Image";

function App() {
  return (
    <Container>
      <Header />
      <Image />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
