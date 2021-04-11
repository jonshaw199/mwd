import Constants from "../Constants";

const Projects = {
  getProjects: async () => {
    const response = await fetch("/projects/sorted");
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
  createProject: async (data, token) => {
    try {
      const response = await fetch("/projects", {
        method: "POST",
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
  updateProject: async (data, token) => {
    const id = data._id;
    delete data._id;
    try {
      const response = await fetch(`/projects/${id}`, {
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
  deleteProject: async (projectID, token) => {
    try {
      const response = await fetch(`/projects/${projectID}`, {
        method: "DELETE",
        header: {
          [Constants.authTokenName]: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
  moveProject: async (data, token) => {
    const { projectID, direction } = data;
    const bodyStringified = JSON.stringify({ direction });
    try {
      const response = await fetch(`/projects/${projectID}/move`, {
        method: "POST",
        headers: {
          [Constants.authTokenName]: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: bodyStringified,
      });
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
  createProjectImage: async (data, token) => {
    const id = data._id;
    delete data._id;
    try {
      const response = await fetch(`/projects/${id}/image`, {
        method: "POST",
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
  deleteProjectImage: async (data, token) => {
    const { projectID, imageID } = data;
    try {
      const response = await fetch(`/projects/${projectID}/image/${imageID}`, {
        method: "DELETE",
        headers: {
          [Constants.authTokenName]: token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
  moveProjectImage: async (data, token) => {
    const { projectID, imageID, direction } = data;
    const bodyStringified = JSON.stringify({ direction });
    try {
      const response = await fetch(
        `/projects/${projectID}/image/${imageID}/move`,
        {
          method: "POST",
          headers: {
            [Constants.authTokenName]: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: bodyStringified,
        }
      );
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
  makePrimaryProjectImage: async (data, token) => {
    const { projectID, imageID } = data;
    try {
      const response = await fetch(
        `/projects/${projectID}/image/${imageID}/primary`,
        {
          method: "POST",
          headers: {
            [Constants.authTokenName]: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const jsonifiedResponse = await response.json();
      return jsonifiedResponse;
    } catch (e) {
      return { errors: e };
    }
  },
};

export default Projects;
