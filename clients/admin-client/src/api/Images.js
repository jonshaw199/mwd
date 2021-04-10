import Constants from "../Constants";

const Images = {};

Images.createImage = async (data, token) => {
  try {
    const response = await fetch("/images", {
      method: "POST",
      headers: {
        [Constants.authTokenName]: token,
        Accept: "application/json",
      },
      body: data,
    });
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  } catch (e) {
    return { errors: e };
  }
};

Images.updateImage = async (data, token) => {
  const id = data.get("_id");
  data.delete("_id");
  try {
    const response = await fetch(`/images/${id}`, {
      method: "PUT",
      headers: {
        [Constants.authTokenName]: token,
        Accept: "application/json",
      },
      body: data,
    });
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  } catch (e) {
    return { errors: e };
  }
};

export default Images;
