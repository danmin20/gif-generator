import Header from "components/Header";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

const Detail = () => {
  const id = useRouter().query.id;
  return (
    <Container>
      <Header />
      <ImgBox>
        <img
          className="img"
          src={`https://9davbjzey4.execute-api.ap-northeast-2.amazonaws.com/?id=${id}`}
        />
      </ImgBox>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImgBox = styled.div`
  position: relative;
  max-width: 60%;
  max-height: 60%;
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow.normal};
  border-radius: 2rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  display: flex;
  padding: 3rem;
  /* flex: 0.6; */
  /* .sub-flex {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :first-child {
      border-right: 1px solid ${({ theme }) => theme.color.gray};
    }
  } */
  .img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  .box {
    width: 90%;
    border-radius: 1.5rem;
    box-shadow: ${({ theme }) => theme.boxShadow.normal};
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img {
    max-width: 90%;
    max-height: 90%;
  }
`;

export default Detail;
