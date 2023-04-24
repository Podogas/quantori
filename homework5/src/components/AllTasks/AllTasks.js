import './AllTasks.css';
import {createElement} from '../../utils/Utils';
import { deleteTask, updateTask } from '../../api/Api';
import {deleteComponent, updateComponent} from '../../index.js';
import CompletedTasks from '../CompletedTasks/CompletedTasks';

export default function AllTasks(tasks) {
    const section = createElement('section', ['all-tasks'],)
    if (tasks.incompleted.length !== 0) {
    const title = createElement('h3', ['all-tasks__title'],  'All Tasks');
    function Task(data) {
        const task = createElement('div', ["all-tasks__task"],);
        const checkbox = createElement('input', ['all-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}]);
        const taskInfoWrapper = createElement('div', ["all-tasks__task-info-wrapper"],);
        const taskTitle = createElement('h4', ["all-tasks__task-title"], data.title,);
        const taskCaptionWrapper = createElement('div', ["all-tasks__task-caption-wrapper"],);
        const taskTag = createElement('span', ['all-tasks__task-tag', `all-tasks__task-tag--${data.tag}`], data.tag);
        const taskDate = createElement('span', ['all-tasks__task-date'], data.date);
        const taskButton = createElement('button', ['all-tasks__task-button'], null, [{name: "type", value: "button"}])
        function removeTask() {
            deleteTask(data.id)
            .then(res => res.json())
            .catch(err => console.error(err, err.message))
            .then( () => {
                removeTaskFromList();
            })
        }
        function removeTaskFromList() {
            tasks.incompleted = tasks.incompleted.filter(d => d!==data);
            deleteComponent(task,'.all-tasks');   
        }
        function moveTaskToComplited() {
            const dataToPush = tasks.incompleted.filter(d => d==data)[0];
            dataToPush.isCompleted = true;
            dataToPush.prevTag = dataToPush.tag;
            dataToPush.updatedAt = Date.now();
            tasks.completed.unshift(dataToPush)
            updateTask(dataToPush ,data.id)
            .catch(err => console.error(err, err.message))
            .then( () => {
                setTimeout(() => {
                    removeTaskFromList(task);
                    updateComponent(CompletedTasks, tasks, 'completed-tasks');
                    updateComponent(AllTasks, tasks, 'all-tasks');
                }, 100);
            })    
        }

        taskButton.onclick = () => {
            removeTask();

        }
        checkbox.onclick = () => {
            moveTaskToComplited();

        }
        taskCaptionWrapper.append(taskTag, taskDate);
        taskInfoWrapper.append(taskTitle, taskCaptionWrapper);
        task.append(checkbox,taskInfoWrapper, taskButton);
        return task;
    }
    const taskElArray = [];
    tasks.incompleted.forEach(taskData => {
        taskElArray.push(Task(taskData))});
    section.innerHTML = ''
    section.append(title, ...taskElArray)
    return section;
    }  else {
        section.style.display = 'none';
        return section;
    }
}
