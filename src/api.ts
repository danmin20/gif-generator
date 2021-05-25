import axios from "axios";

const baseURL = "https://9davbjzey4.execute-api.ap-northeast-2.amazonaws.com";

export const postGif = async (formData) => {
  const { data } = await axios.post(baseURL, formData);
  return data;
};

export const getGif = async (id) => {
  const { data } = await axios.get(baseURL, {
    params: {
      id: id,
    },
  });

  return data;
};
