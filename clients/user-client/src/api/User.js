const registerUser = async (userInfo) => {
  const response = await fetch(`/users`, {
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
  const response = await fetch(`/users/${token}`);
  const jsonifiedResponse = await response.json();
  return jsonifiedResponse;
};

export { registerUser, getUserByToken };
