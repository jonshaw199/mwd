const Validation = {
  validateFields: async (fieldsToValidate) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/validation/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fieldsToValidate }),
    });
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
};

export default Validation;
