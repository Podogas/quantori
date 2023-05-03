import './modal.css';
import { createElement, getDayPart } from '../../utils/Utils';
import {appContainer} from '../../index';

export default function Modal(tasks: Array<any>):HTMLElement {

    function closeModal():void{
        appContainer.removeChild(section)

    }
    function fillList(task: {title: string}):HTMLElement{
        const listItem:HTMLElement = createElement('li', ['modal__list-item']);
        listItem.innerText = task.title;
        return listItem;
    }
    const section:HTMLElement = createElement('section', ['modal'],);
    const title:HTMLElement = createElement('h2', ['modal__title'], `Good ${getDayPart()}`);
    const listCaption:HTMLElement = createElement('p', ['modal__list-caption'], 'You have the next planned tasks for today: ');
    const list:HTMLElement = createElement('ul', ['modal__list']);
    const button:HTMLElement = createElement('button', ['modal__button'], 'Ok', [{name: 'type', value: 'button'}]);
    button.onclick = closeModal;
    let taskElArray: Array<HTMLElement> = [];
    tasks.forEach(taskData => {
        taskElArray.push(fillList(taskData))});
    list.append(...taskElArray);
    section.append(title, listCaption, list, button);
    return section;
}