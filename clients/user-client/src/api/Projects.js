const Projects = {
  getProjects: async () => {
    const response = await fetch("/projects/sorted");
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
};

export default Projects;
