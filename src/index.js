import { openTaskDialog } from './pages/new-task.js';
import { openProjectDialog } from './pages/new-project.js';
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

printTask();