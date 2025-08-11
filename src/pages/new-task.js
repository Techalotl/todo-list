import '../styles/styles.css';
import { printTask } from "./tasks";

export const tasks = [];
const today = new Date();
const currentDay = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
const mainContainer = document.querySelector('#main-container');

class Task {
  constructor (title, description, date, priority, notes, toProject, status) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.notes = notes;
    this.toProject = toProject;
    this.status = status;
  }
  taskCompleted () {
    this.status === false ? this.status = true : this.status = false;
  }
}

function checkForm () {
  const taskTitle = document.querySelector('#title');
  const taskDescription = document.querySelector('#description');
  const taskDate = document.querySelector('#due-date');
  const taskPriority = document.querySelector('#priority');
  const taskNotes = document.querySelector('#notes');
  const taskProject = document.querySelector('#project');
  if (taskTitle.value === '' 
    && taskDescription.value === '' 
    && taskDate.value === '') {
      console.log('nope');
    return
  } else {
    const task = new Task (taskTitle.value || 'Untitled Task',
      taskDescription.value,
      taskDate.value || currentDay,
      taskPriority.value,
      taskNotes.value,
      taskProject.value,
      false);
    console.log(task);
    tasks.push(task);
    console.log(tasks);
    console.log('object added');
  }
}

const example1 = new Task ('Read email', 'So I can clean my inbox', currentDay, '#3', 'Let us stop procrastinating this, please.', '', false);
const example2 = new Task ('Take Sparks to the vet', 'What the title says', currentDay, '#1', 'He needs his last vaccine. Also remember to ask about the weird turd he produce.', '', false);
const example3 = new Task ('Call Simon', 'Need to confirm his assistance', '2026-02-01','#2', '', '', true);
tasks.push(example1, example2, example3);
console.log(tasks);

export function openTaskDialog () {
  const taskDialog = document.querySelector('#task-dialog');
  const cancelButton = document.querySelector('#cancelTask');
  const confirmTask = document.querySelector('#confirmTask');
  taskDialog.showModal();
  cancelButton.addEventListener('click', () => {
    taskDialog.close();
  });
  confirmTask.addEventListener('click', () => {
    checkForm();
    printTask();
    const taskForm = document.querySelector('#task-form');
    taskForm.reset();
    
  })
}

mainContainer.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'trash-icon') {
    tasks.splice(e.target.classList[1], 1);
    printTask();
  }
})