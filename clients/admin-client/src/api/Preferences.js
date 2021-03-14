const Preferences = {
  getPreferences: async () => {
    const response = await fetch("/preferences/");
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
};

export default Preferences;
