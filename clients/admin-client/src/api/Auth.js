const logIn = async (frmData) => {
  const response = await fetch("/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: frmData,
  });
  const jsonifiedResponse = await response.json();
  return jsonifiedResponse;
};

export { logIn };
