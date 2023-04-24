import './CompletedTasks.css';
import {createElement} from '../../utils/Utils';
import { updateTask } from '../../api/Api';
import AllTasks from '../AllTasks/AllTasks';

import { App, deleteComponent, updateComponent } from '../../index';

export default function CompletedTasks() {
    const section = createElement('section', ['completed-tasks'],)
    if (App.state.tasks.completed.length !== 0) {
        const title = createElement('h3', ['completed-tasks__title'],  'Completed Tasks');
        function Task(data: {title: string, tag: string, date: string, id: string}) {
            let task = createElement('div', ["completed-tasks__task"],);
            const checkbox = createElement('input', ['completed-tasks__task-checkbox'], null, [{name: "type", value: "checkbox"}, {name: "checked", value: "true"}]);
            const taskInfoWrapper = createElement('div', ["completed-tasks__task-info-wrapper"],);
            const taskTitle = createElement('h4', ["completed-tasks__task-title"], data.title,);
            const taskCaptionWrapper = createElement('div', ["completed-tasks__task-caption-wrapper"],);
            const taskTag = createElement('span', ['completed-tasks__task-tag', `completed__task-tag--completed`], data.tag);
            const taskDate = createElement('span', ['completed-tasks__task-date'], data.date);
            function removeTaskFromList() {
                App.state.tasks.completed = App.state.tasks.completed.filter(d => d!==data);
                deleteComponent(task,'.completed-tasks')
            }
            function moveTaskToAllTasks() {
                const dataToPush = App.state.tasks.completed.filter(d => d==data)[0];
                const prevTag = dataToPush.prevTag ? dataToPush.prevTag : 'other';
                dataToPush.tag = prevTag;
                dataToPush.isCompleted = false;
                dataToPush.updatedAt = Date.now();
                App.state.tasks.incompleted.push(dataToPush);
                updateTask(dataToPush ,data.id)
                .catch(err => console.error(err, err.message))
                .then( () => {
                    removeTaskFromList();
                    updateComponent(AllTasks, App.state.tasks, 'all-tasks');
                    updateComponent(CompletedTasks, App.state.tasks, 'completed-tasks');
                })
                
                
            }
            checkbox.onclick = moveTaskToAllTasks;
            taskCaptionWrapper.append(taskTag, taskDate);
            taskInfoWrapper.append(taskTitle, taskCaptionWrapper);
            task.append(checkbox,taskInfoWrapper);
            if(App.state.tasks.completed.length === 0) {
                task = null;
            }
            return task;
        }
        const taskElArray: HTMLElement[] = [];
        App.state.tasks.completed.forEach(taskData => {
        taskElArray.push(Task(taskData))});
        section.append(title, ...taskElArray)
        return section;
    }  else {
        section.style.display = 'none';
        return section;
    }
}
