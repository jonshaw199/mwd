import Constants from "../Constants";

const registerUser = async (userInfo) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/users/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  const jsonifiedResponse = await response.json();
  return jsonifiedResponse;
};

const getUserByToken = async (token) => {
  const config = {
    headers: {},
  };
  if (token) {
    config.headers[Constants.authTokenName] = token;
  }
  const response = await fetch(`${process.env.PUBLIC_URL}/auth/user`, config);
  const jsonifiedResponse = await response.json();
  return jsonifiedResponse;
};

export { registerUser, getUserByToken };
