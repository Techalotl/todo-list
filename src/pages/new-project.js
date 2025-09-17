import { addProjectToSelect, printProject } from "./projects";
import { tasks } from "./new-task";
import { printTask } from "./tasks";

export const projects = [];
const mainContainer = document.querySelector('#main-container');

class Project {
  constructor (title, description, done) {
    this.title = title;
    this.description = description;
    this.done = done;
  }
  projectCompleted () {
    this.done === false ? this.done = true : this.done = false;
  }
}

export function openProjectDialog () {
  const projectDialog = document.querySelector('#project-dialog');
  const cancelButton = document.querySelector('#cancel-project');
  const confirmProject = document.querySelector('#confirm-project');
  projectDialog.showModal();
  cancelButton.addEventListener('click', () => {
    projectDialog.close();
  });
  confirmProject.addEventListener('click', () => {
    checkForm();
    const projectForm = document.querySelector('#project-form');
    projectForm.reset();
  })
}

function checkForm () {
  const projectTitle = document.querySelector('#project-title');
  const projectDescription = document.querySelector('#project-description');
  if (projectTitle.value === '' && projectDescription.value === '') {
    return
  } else {
    addNewProject(projectTitle.value || 'Untitled Project', projectDescription.value, false);
    localStorage.setItem('localProjects', JSON.stringify(projects));
    printProject();
    addProjectToSelect('#project');
  }
}

function addNewProject (title, description, done) {
  const project = new Project(title, description, done);
  projects.push(project);
}

const defaultProject = new Project ('','', true);
projects.push(defaultProject);

//Deletes project
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'project-trash-icon') {
    const project = projects[e.target.classList[1]].title;
    deleteTasksInProject(project);
    projects.splice(e.target.classList[1], 1);
    localStorage.removeItem('localProjects');
    if (projects.length > 1) {
      localStorage.setItem('localProjects', JSON.stringify(projects));
    }
    printProject();
  }
})

//Marks project as done
mainContainer.addEventListener('click', (e) => {
  if(e.target.name === 'project-done') {
    if (e.target.checked) {
        projects[e.target.className].projectCompleted();
        printProject();
        localStorage.removeItem('localProjects');
        localStorage.setItem('localProjects', JSON.stringify(projects));
    } else {
        projects[e.target.className].projectCompleted();
        printProject();
        localStorage.removeItem('localProjects');
        localStorage.setItem('localProjects', JSON.stringify(projects));
    }
  }
})

//Shows tasks in a project
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'arrow-button') {
    printTask(projects[`${e.target.classList[1]}`].title);
  }
})

export function tasksPerProject (projectName) {
  const tasksInProject = tasks.filter(task => task.toProject === projectName);
  return tasksInProject.length;
}

function deleteTasksInProject (project) {
  //NO SNEAKY TASKS HERE! It's the only way I could think of.
  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < tasks.length; j++) {
      if (tasks[j].toProject === project) {
        tasks.splice(j,1);
      }
    }
  }
  localStorage.removeItem('localTasks');
  localStorage.setItem('localTasks', JSON.stringify(tasks));
}

export function populateProjects() {
  const storedProjects = localStorage.getItem('localProjects');
  const parsedProjects = JSON.parse(storedProjects);
  for (let i = 1; i < parsedProjects.length; i++) {
    addNewProject(parsedProjects[i].title, parsedProjects[i].description, parsedProjects[i].done);
  }
  addProjectToSelect('#project');
}