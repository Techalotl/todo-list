// import './styles/styles.css'
// import './pages/tasks.js'
import { openTaskDialog } from './pages/new-task.js';
import { printTask } from './pages/tasks.js';

const newTask = document.querySelector('#new-task');
const newProject = document.querySelector('#new-project');
const todayButton =  document.querySelector('#today-button');
const thisWeek = document.querySelector('#this-week');
const projectsButton = document.querySelector('#projects');
const tasksButton = document.querySelector('#tasks-button');

newTask.addEventListener('click', () => {
    console.log('New Task clicked');
    openTaskDialog();
});

newProject.addEventListener('click', () => {
    console.log('New Project clicked');
});

todayButton.addEventListener('click', () => {
    console.log('Today clicked');
});

thisWeek.addEventListener('click', () => {
    console.log('This week clicked');
});

projectsButton.addEventListener('click', () => {
    console.log('Projects clicked');
});

tasksButton.addEventListener('click', () => {
    printTask();
    console.log('Tasks clicked');
});

printTask();