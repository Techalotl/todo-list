import '../styles/styles.css';
import { printTask } from './tasks';
import { printProject } from './projects';

export const tasks = [];
const today = new Date();
const currentDay = `${today.getFullYear()},${today.getMonth()+1},${today.getDate()}`;
const { lightFormat } = require('date-fns');
export const currentDayFormat = lightFormat(new Date (currentDay), 'yyyy-MM-dd');
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

const example1 = new Task ('Read email', 'So I can clean my inbox', currentDayFormat, '#3', 'Let us stop procrastinating this, please.', '', false);
const example2 = new Task ('Take Sparks to the vet', 'What the title says', currentDayFormat, '#1', 'He needs his last vaccine. Also remember to ask about the weird turd he produce.', '', false);
const example3 = new Task ('Call Simon', 'Need to confirm his assistance', '2026-02-01','#2', '', '', true);
tasks.push(example1, example2, example3);

export function openTaskDialog () {
  const taskDialog = document.querySelector('#task-dialog');
  const cancelButton = document.querySelector('#cancel-task');
  const confirmTask = document.querySelector('#confirm-task');
  taskDialog.showModal();
  cancelButton.addEventListener('click', () => {
    taskDialog.close();
  });
  confirmTask.addEventListener('click', () => {
    const taskTitle = document.querySelector('#title');
    const taskDescription = document.querySelector('#description');
    const taskDate = document.querySelector('#due-date');
    const taskPriority = document.querySelector('#priority');
    const taskNotes = document.querySelector('#notes');
    const taskProject = document.querySelector('#project');
    const taskForm = document.querySelector('#task-form');
    if (taskTitle.value === '' && taskDescription.value === '' && taskDate.value === '') {
      taskForm.reset();
      return
    } else {
      const task = new Task (taskTitle.value || 'Untitled task', taskDescription.value,
        taskDate.value || currentDayFormat, taskPriority.value, taskNotes.value, taskProject.value, false
      )
      tasks.push(task);
      if (taskProject.value === '') {
        printTask();
        taskForm.reset();
      } else {
        printProject();
        taskForm.reset();
        return
      }
    }
  })
}

//Delete task
mainContainer.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'trash-icon') {
    const project = tasks[e.target.classList[1]].toProject;
    tasks.splice(e.target.classList[1], 1);
      printTask(project);
  }
})