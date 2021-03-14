import Constants from "../Constants";

const Images = {};

Images.uploadImage = async (data, token) => {
  const response = await fetch("/images", {
    method: "POST",
    headers: {
      [Constants.authTokenName]: token,
    },
    body: data,
  });
  const jsonifiedResponse = await response.json();
  return jsonifiedResponse;
};

export default Images;
