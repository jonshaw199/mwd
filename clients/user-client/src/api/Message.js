const Message = {
  postMessage: async (msgData) => {
    try {
      const response = await fetch("/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(msgData),
      });
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
};

export default Message;
