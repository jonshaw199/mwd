const Projects = {
  getProjects: async () => {
    const response = await fetch("/projects/");
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
};

export default Projects;
