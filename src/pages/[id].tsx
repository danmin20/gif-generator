import { useRouter } from "next/dist/client/router";

const Detail = () => {
  const id = useRouter().query.id;

  return (
    <div>
      <img
        src={`https://9davbjzey4.execute-api.ap-northeast-2.amazonaws.com/?id=${id}`}
      />
    </div>
  );
};

export default Detail;
