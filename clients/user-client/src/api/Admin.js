const logIn = async (username, password) => {
  const response = await fetch("/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const jsonifiedResponse = await response.json();
  return jsonifiedResponse;
};

export { logIn };
