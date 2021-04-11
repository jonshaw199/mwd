const Preferences = require("../../models/Preferences");

const deleteProject = async (projectID) => {
  try {
    const preferences = await Preferences.findOne();
    const projectIndexInPrefs = preferences.content.projects.indexOf(projectID);
    const data = null;
    if (projectIndexInPrefs > -1) {
      preferences.content.projects.splice(projectIndexInPrefs, 1);
      preferences.markModified("content.projects");
      data = await preferences.save();
    }
    return data;
  } catch (e) {
    return e;
  }
};

const moveProject = async (projectID, direction) => {
  try {
    const preferences = await Preferences.findOne();
    const projects = preferences.content.projects;
    const projectIndex = projects.indexOf(projectID);
    if (projectIndex === -1) {
      return res
        .status(500)
        .json({ errors: ["Project ID provided is invalid"] });
    }
    if (
      (projectIndex === 0 && direction.toLowerCase() === "up") ||
      (projectIndex >= projects.length - 1 &&
        direction.toLowerCase() === "down")
    ) {
      return res
        .status(500)
        .json({ errors: ["Cant move project any further"] });
    }
    const newProjectIndex =
      direction.toLowerCase() === "up" ? projectIndex - 1 : projectIndex + 1;
    const tmpProject = projects[newProjectIndex];
    projects[newProjectIndex] = projects[projectIndex];
    projects[projectIndex] = tmpProject;
    preferences.markModified("content.projects");
    const data = await preferences.save();
    return data;
  } catch (e) {
    return e;
  }
};

const createProject = async (projectID) => {
  let data = null;
  try {
    const preferences = await Preferences.findOne();
    if (preferences && projectID) {
      preferences.content.projects.push(projectID);
      preferences.markModified("content.projects");
      data = await preferences.save();
    }
    return data;
  } catch (e) {
    return e;
  }
};

module.exports = {
  deleteProject,
  moveProject,
  createProject,
};
