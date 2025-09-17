import { openTaskDialog, tasks, populateTasks, setExampleTasks } from './pages/new-task.js';
import { openProjectDialog, populateProjects, projects } from './pages/new-project.js';
import { printTodayTasks } from './pages/today.js';
import { printTaskByWeek } from './pages/this-week.js';
import { printProject } from './pages/projects.js';
import { printTask } from './pages/tasks.js';

const newTask = document.querySelector('#new-task');
const newProject = document.querySelector('#new-project');
const todayButton =  document.querySelector('#today-button');
const thisWeek = document.querySelector('#this-week');
const projectsButton = document.querySelector('#projects');
const tasksButton = document.querySelector('#tasks-button');

newTask.addEventListener('click', () => {
    openTaskDialog();
});

newProject.addEventListener('click', () => {
    openProjectDialog();
});

todayButton.addEventListener('click', () => {
    printTodayTasks();
});

thisWeek.addEventListener('click', () => {
    printTaskByWeek();
});

projectsButton.addEventListener('click', () => {
    printProject();
});

tasksButton.addEventListener('click', () => {
    printTask();
});

if (localStorage.getItem('localProjects') && projects.length === 1) {
    populateProjects();
}
if (localStorage.getItem('localTasks') && tasks.length === 0) {
    populateTasks();
} else if (!localStorage.getItem('localTasks') && tasks.length === 0) {
    setExampleTasks();
}
printTask();