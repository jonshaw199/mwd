const Projects = {
  getProjects: async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/projects/sorted`);
    const jsonifiedResponse = await response.json();
    return jsonifiedResponse;
  },
};

export default Projects;
