import './AllTasks.css';
import {createElement} from '../../utils/Utils';
import { deleteTask, updateTask } from '../../api/Api';
import {deleteComponent, updateComponent} from '../../index';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import {Tasks, Task} from '../../utils/Interfaces';

export default function AllTasks(tasks: Tasks):HTMLElement {
    const section:HTMLElement = createElement('section', ['all-tasks'],)
    if (tasks.incompleted.length !== 0) {
    const title: HTMLElement = createElement('h3', ['all-tasks__title'],  'All Tasks');
    function Task(data: Task):HTMLElement | null {
        let task:HTMLElement | null = createElement('div', ["all-tasks__task"],);
        const checkbox:HTMLElement = createElement('input', ['all-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}]);
        const taskInfoWrapper:HTMLElement = createElement('div', ["all-tasks__task-info-wrapper"],);
        const taskTitle:HTMLElement = createElement('h4', ["all-tasks__task-title"], data.title,);
        const taskCaptionWrapper:HTMLElement = createElement('div', ["all-tasks__task-caption-wrapper"],);
        const taskTag:HTMLElement = createElement('span', ['all-tasks__task-tag', `all-tasks__task-tag--${data.tag}`], data.tag);
        const taskDate:HTMLElement = createElement('span', ['all-tasks__task-date'], data.date);
        const taskButton:HTMLElement = createElement('button', ['all-tasks__task-button'], null, [{name: "type", value: "button"}])
        function removeTask():void {
            deleteTask(data.id)
            .then(res => res.json())
            .catch(err => console.error(err, err.message))
            .then( () => {
                removeTaskFromList();
            })
        }
        function removeTaskFromList():void {
            tasks.incompleted = tasks.incompleted.filter(d => d!==data);
            deleteComponent(task,'.all-tasks');   
        }
        function moveTaskToComplited():void {
            const dataToPush:Task = tasks.incompleted.find((d:Task) => d===data);
            dataToPush.isCompleted = true;
            dataToPush.prevTag = dataToPush.tag;
            dataToPush.updatedAt = Date.now();
            tasks.completed.push(dataToPush)
            updateTask(dataToPush ,data.id)
            .catch(err => console.error(err, err.message))
            .then( () => {
                setTimeout(() => {
                    removeTaskFromList();
                    updateComponent(CompletedTasks, tasks, 'completed-tasks');
                    updateComponent(AllTasks, tasks, 'all-tasks');
                }, 100);
            })    
        }

        taskButton.onclick = ():void => {
            removeTask();

        }
        checkbox.onclick = ():void => {
            moveTaskToComplited();

        }
        taskCaptionWrapper.append(taskTag, taskDate);
        taskInfoWrapper.append(taskTitle, taskCaptionWrapper);
        task.append(checkbox,taskInfoWrapper, taskButton);
        if(tasks.incompleted.length === 0) {
            task = null;
        }
        return task;
    }
    const taskElArray: HTMLElement[] = [];
    tasks.incompleted.forEach((taskData:Task) => {
        taskElArray.push(Task(taskData))});
    section.innerHTML = ''
    section.append(title, ...taskElArray)
    return section;
    }  else {
        section.style.display = 'none';
        return section;
    }
}
