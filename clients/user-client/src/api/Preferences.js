const Preferences = {
  getPreferences: async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/preferences/`);
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
};

export default Preferences;
