import Header from "components/Header";
import Image from "components/Image";
import styled from "styled-components";
import dynamic from "next/dynamic";

const ToastEditor = dynamic(() => import("components/ToastEditor"), {
  ssr: false,
});

const Index = () => (
  <Container>
    <Header />
    <Image />
    {/* <ToastEditor /> */}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Index;
