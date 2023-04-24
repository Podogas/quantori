import './modal.css';
import { createElement, getDayPart } from '../../utils/Utils';
//DELETE!!!!
const appContainer = document.getElementById("functional-example");

export default function Modal(tasks) {

    function closeModal(){
        appContainer.removeChild(section)

    }
    function fillList(task){
        const listItem = createElement('li', ['modal__list-item']);
        listItem.innerText = task.title;
        return listItem;
    }
    const section = createElement('section', ['modal'],);
    const title = createElement('h2', ['modal__title'], `Good ${getDayPart()}`);
    const listCaption = createElement('p', ['modal__list-caption'], 'You have the next planned tasks for today: ');
    const list = createElement('ul', ['modal__list']);
    const button = createElement('button', ['modal__button'], 'Ok', [{name: 'type', value: 'button'}]);
    button.onclick = closeModal;
    let taskElArray = [];
    tasks.forEach(taskData => {
        taskElArray.push(fillList(taskData))});
    list.append(...taskElArray);
    section.append(title, listCaption, list, button);
    return section;
}