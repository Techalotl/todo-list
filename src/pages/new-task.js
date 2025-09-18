import '../styles/styles.css';
import { printTask } from './tasks';
import { printProject, addProjectToSelect } from './projects';
import { printTodayTasks } from './today';

export const tasks = [];
const { lightFormat } = require('date-fns');
export const todayDate = lightFormat(new Date (), 'yyyy-MM-dd');
const mainContainer = document.querySelector('#main-container');

class Task {
  constructor (title, description, date, priority, notes, toProject, done) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.notes = notes;
    this.toProject = toProject;
    this.done = done;
  }
  taskCompleted () {
    this.done === false ? this.done = true : this.done = false;
  }
}

export function setExampleTasks () {
  const { addDays } = require("date-fns");
  const tomorrowDate = lightFormat(new Date (addDays(new Date (), 1)), 'yyyy-MM-dd');
  const nextWeekDate = lightFormat(new Date (addDays(new Date (), 7)), 'yyyy-MM-dd');
  const example1 = new Task ('Read email', 'So I can clean my inbox (Example Task)', todayDate, 'Low', 'Let us stop procrastinating this, please.', '', false);
  const example2 = new Task ('Take Sparks to the vet', 'What the title says (Example Task)', tomorrowDate, 'High', 'He needs his last vaccine. Also remember to ask about the weird turd he produce.', '', false);
  const example3 = new Task ('Call Simon', 'Need to confirm his assistance (Example Task)', nextWeekDate,'Medium', '', '', true);
  const exampleTasks = [];
  exampleTasks.push(example1, example2, example3);
  localStorage.setItem('localTasks', JSON.stringify(exampleTasks));
  populateTasks();
}

export function openTaskDialog () {
  const taskDialog = document.querySelector('#task-dialog');
  const cancelButton = document.querySelector('#cancel-task');
  const confirmButton = document.querySelector('#confirm-task');
  taskDialog.showModal();
  cancelButton.addEventListener('click', () => {taskDialog.close();});
  confirmButton.addEventListener('click', () => {
    checkTaskForm();
  });
}

function checkTaskForm() {
  const taskTitle = document.querySelector('#title');
  const taskDescription = document.querySelector('#description');
  const taskDate = document.querySelector('#due-date');
  const taskPriority = document.querySelector('#priority');
  const taskNotes = document.querySelector('#notes');
  const taskProject = document.querySelector('#project');
  const taskForm = document.querySelector('#task-form');
  if (taskTitle.value === '' && taskDescription.value === '' && taskDate.value === '') {
    taskForm.reset();
  } else {
    addNewTask(taskTitle.value || 'Untitled task', taskDescription.value,
    taskDate.value || todayDate, taskPriority.value, taskNotes.value, taskProject.value, false);
    localStorage.setItem('localTasks', JSON.stringify(tasks));
    if (taskProject.value === '') {
      printTask();
      taskForm.reset();
    } else {
      printProject();
      taskForm.reset();
    }
  }
}

function addNewTask (title, description, date, priority, notes, toProject, done) {
  const task = new Task (title, description, date, priority, notes, toProject, done);
  tasks.push(task);
}

//Delete task
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'trash-icon') {
    const project = tasks[e.target.classList[1]].toProject;
    tasks.splice(e.target.classList[1], 1);
    localStorage.removeItem('localTasks');
    if (tasks.length > 0) {
      localStorage.setItem('localTasks', JSON.stringify(tasks));
    }
    printTask(project);
  }
})

//Edit task
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'edit-icon') {
    const target = e.target.classList[1];
    const taskDialog = document.querySelector('#edit-task-dialog');
    const cancelButton = document.querySelector('#edit-cancel-task');
    const confirmButton = document.querySelector('#edit-confirm-task');
    addProjectToSelect('#edit-project');
    fillEditDialog(target);
    taskDialog.showModal();
    cancelButton.onclick = () => {
      taskDialog.close();
    }
    confirmButton.onclick = () => {
      checkTaskEdits(target);
    }
  }
})

function fillEditDialog (target) {
  const taskTitle = document.querySelector('#edit-title');
  const taskDescription = document.querySelector('#edit-description');
  const taskDate = document.querySelector('#edit-due-date');
  const taskPriority = document.querySelector('#edit-priority');
  const taskNotes = document.querySelector('#edit-notes');
  const taskProject = document.querySelector('#edit-project');
  taskTitle.value = tasks[target].title;
  taskDescription.value = tasks[target].description;
  taskDate.value = tasks[target].date;
  taskPriority.value = tasks[target].priority;
  taskNotes.value = tasks[target].notes;
  taskProject.value = tasks[target].toProject;
}

function checkTaskEdits (target) {
  const taskTitle = document.querySelector('#edit-title');
  const taskDescription = document.querySelector('#edit-description');
  const taskDate = document.querySelector('#edit-due-date');
  const taskPriority = document.querySelector('#edit-priority');
  const taskNotes = document.querySelector('#edit-notes');
  const taskProject = document.querySelector('#edit-project');
  if (taskTitle.value === '' && taskDescription.value === '' && taskDate.value === '') {
    return
  } else if (tasks[target].title != taskTitle.value ||
    tasks[target].description != taskDescription.value ||
    tasks[target].date != taskDate.value ||
    tasks[target].priority != taskPriority.value ||
    tasks[target].notes != taskNotes.value ||
    tasks[target].toProject != taskProject.value) {
      tasks[target].title = taskTitle.value || 'Untitled task';
      tasks[target].description = taskDescription.value;
      tasks[target].date = taskDate.value || todayDate;
      tasks[target].priority = taskPriority.value;
      tasks[target].notes = taskNotes.value;
      tasks[target].toProject = taskProject.value;
      localStorage.removeItem('localTasks');
      localStorage.setItem('localTasks', JSON.stringify(tasks));
      if (taskProject.value === '') {
        printTask();
      } else if (taskDate.value === todayDate) {
        printTodayTasks();
      } else { printTask(taskProject.value); }
  }
}

export function populateTasks () {
  const storedTasks = localStorage.getItem('localTasks');
  const parsedTasks = JSON.parse(storedTasks);
  for (let i = 0; i < parsedTasks.length; i++) {
    addNewTask(parsedTasks[i].title, parsedTasks[i].description,
      parsedTasks[i].date, parsedTasks[i].priority, parsedTasks[i].notes,
      parsedTasks[i].toProject, parsedTasks[i].done);
  }
}