import { tasks, todayDate } from "./new-task";
import arrowD from '../assets/arrowDown.svg';
import edit from '../assets/edit.svg';
import trash from '../assets/trash.svg';
import trash1 from '../assets/trash1.svg';

const mainContainer = document.querySelector('#main-container');

export function printTodayTasks () {
    mainContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].date === todayDate) {
            const taskDiv = document.createElement('div');
            taskDiv.setAttribute('class', 'task-div');
            taskDiv.setAttribute('id', `task-div-${i}`);
            mainContainer.appendChild(taskDiv);
            const taskDivTop = document.createElement('div');
            taskDivTop.setAttribute('class', 'task-div-top');
            taskDiv.appendChild(taskDivTop);
            const titleDiv = document.createElement('div');
            titleDiv.setAttribute('class', 'title-container');
            taskDivTop.appendChild(titleDiv);
            const taskNameContainer = document.createElement('div');
            taskNameContainer.setAttribute('class', 'task-name-container');
            titleDiv.appendChild(taskNameContainer);
            const taskName = document.createElement('h3');
            taskName.setAttribute('id', `task-name-${i}`);
            taskName.innerText = tasks[i].title;
            taskNameContainer.appendChild(taskName);
            const arrowDown = document.createElement('img');
            arrowDown.setAttribute('class', `arrow-icon ${i}`);
            arrowDown.setAttribute('id', `arrow-icon-${i}`);
            arrowDown.src = arrowD;
            arrowDown.alt = 'Icon of an arrow pointing downwards';
            taskNameContainer.appendChild(arrowDown);
            const descriptionDiv = document.createElement('div');
            descriptionDiv.textContent = tasks[i].description;
            descriptionDiv.setAttribute('class', 'description');
            titleDiv.appendChild(descriptionDiv);
            const icons = document.createElement('div');
            icons.setAttribute('class', 'icons');
            taskDivTop.appendChild(icons);
            const checkTask = document.createElement('input');
            checkTask.setAttribute('type', 'checkbox');
            checkTask.setAttribute('name', 'task-done');
            checkTask.setAttribute('id',`${i}`);
            icons.appendChild(checkTask);
            const editIcon = document.createElement('img');
            editIcon.setAttribute('class', `edit-icon ${i}`);
            editIcon.setAttribute('id', `edit-icon-${i}`);
            editIcon.src = edit;
            editIcon.alt = 'Icon for edit the content';
            icons.appendChild(editIcon);
            const deleteTaskIcon = document.createElement('img');
            deleteTaskIcon.setAttribute('class', `trash-icon ${i}`);
            deleteTaskIcon.setAttribute('id', `trash-icon-${i}`);
            deleteTaskIcon.src = trash;
            deleteTaskIcon.alt = 'Icon of a trash can';
            icons.appendChild(deleteTaskIcon);
            const taskDivBottom = document.createElement('div');
            taskDivBottom.setAttribute('class', 'task-div-bottom');
            taskDivBottom.setAttribute('id', `task-div-bottom-${i}`);
            taskDiv.appendChild(taskDivBottom);
            taskDivBottom.style.display = 'none';
            const taskDate = document.createElement('p');
            taskDate.textContent = `Due date: ${tasks[i].date}`;
            taskDivBottom.appendChild(taskDate);
            if (tasks[i].priority === '#1') {
                taskDiv.style.border = '10px solid #26331a';
                taskName.style.fontSize = '2rem';
            } else if (tasks[i].priority === '#2') {
                taskDiv.style.border = '5px solid #26331a';
                taskName.style.fontSize = '1.7rem';
            } else {
                taskDiv.style.border = '2px solid #26331a';
            }
            const taskNotes = document.createElement('p');
            taskNotes.setAttribute('class', 'notes');
            taskDivBottom.appendChild(taskNotes);
            if (tasks[i].notes === '') {
                taskNotes.style.display = 'none';
            } else {
                taskNotes.style.display = 'flex';
                taskNotes.textContent = `Notes: ${tasks[i].notes}`;
            }
            if (tasks[i].done === true) {
                checkTask.checked = true;
                taskDiv.style.backgroundColor = '#26331a';
                taskName.style.color = '#99cc66';
                editIcon.style.display = 'none';
                arrowDown.style.display = 'none';
                deleteTaskIcon.src = trash1;
            }
        }
    }
}