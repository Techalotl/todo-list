import '../styles/projects.css';
import { projects, tasksPerProject } from "./new-project";
import trash from '../assets/trash.svg';
import trash1 from '../assets/trash1.svg';

const mainContainer = document.querySelector('#main-container');

export function printProject () {
    mainContainer.innerHTML = '';
    for (let i = 1; i < projects.length; i++) {
        const projectDiv = document.createElement('div');
        projectDiv.setAttribute('class', 'project-container')
        mainContainer.appendChild(projectDiv);
        const projectDivTop = document.createElement('div');
        projectDivTop.setAttribute('class', 'project-div');
        projectDiv.appendChild(projectDivTop);
        const projectTitleDiv = document.createElement('div');
        projectTitleDiv.setAttribute('class', 'project-title-container')
        projectDivTop.appendChild(projectTitleDiv);
        const projectNameContainer = document.createElement('div');
        projectNameContainer.setAttribute('class', 'project-name-container');
        projectTitleDiv.appendChild(projectNameContainer);
        const projectName = document.createElement('h3');
        projectName.innerText = projects[i].title;
        projectNameContainer.appendChild(projectName);
        const arrowRight = document.createElement('button');
        arrowRight.setAttribute('class', `arrow-button ${i}`);
        projectNameContainer.appendChild(arrowRight);
        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = projects[i].description;
        descriptionDiv.setAttribute('class', 'project-description');
        projectTitleDiv.appendChild(descriptionDiv);
        const projectTasks = document.createElement('div');
        projectTasks.textContent = `Tasks: ${tasksPerProject(projects[i].title)}`
        projectTitleDiv.appendChild(projectTasks);
        const projectIcons = document.createElement('div');
        projectIcons.setAttribute('class', 'icons');
        projectDivTop.appendChild(projectIcons);
        const checkProject = document.createElement('input');
        checkProject.setAttribute('type', 'checkbox');
        checkProject.setAttribute('name', 'project-done');
        checkProject.setAttribute('class',`${i}`)
        projectIcons.appendChild(checkProject);
        const deleteProjectIcon = document.createElement('img');
        deleteProjectIcon.setAttribute('class', `project-trash-icon ${i}`);
        deleteProjectIcon.src = trash;
        deleteProjectIcon.alt = 'Icon of a trash can';
        projectIcons.appendChild(deleteProjectIcon);
        if (projects[i].done === true) {
            checkProject.checked = true;
            projectDiv.style.backgroundColor = '#264c00';
            projectName.style.color = '#939e01';
            arrowRight.style.display = 'none';
            deleteProjectIcon.src = trash1;
        }
    }
}

export function addProjectToSelect () {
    const projectOptions = document.querySelector('#project');
    projectOptions.textContent = '';
    for (let i = 0; i < projects.length; i++) {
        const option = document.createElement('option');
        option.textContent = `${projects[i].title}`;
        projectOptions.appendChild(option);
    }
}
