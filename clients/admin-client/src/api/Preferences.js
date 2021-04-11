import Constants from "../Constants";

const Preferences = {
  getPreferences: async () => {
    const response = await fetch("/preferences/");
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
  updatePreferences: async (data, token) => {
    try {
      const response = await fetch(`/preferences`, {
        method: "PUT",
        headers: {
          [Constants.authTokenName]: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
};

export default Preferences;
