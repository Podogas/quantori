import './Popup.css';
import {createElement, formatDate} from '../../utils/Utils';
import { postTask } from '../../api/Api';
import { togglePopup, App, updateComponent } from '../../index';
import AllTasks from '../AllTasks/AllTasks';
import {Task} from '../../utils/Interfaces';
export default function Popup():HTMLElement {
    let popupTextInputValue:string = '';
    let popupTagValue:string = '';
    let popupDateValue:string = `${formatDate(new Date())}`;
    const popup:HTMLElement = createElement('section', ['popup'],);
    const title:HTMLElement = createElement('h2', ['popup__title'], 'Add New Task');
    const input = createElement('input', ['popup__input'], null, [{name: 'type',value: 'text'},{name: 'placeholder' ,value: 'Task Title'}]) as HTMLInputElement;
    const infoWrapper:HTMLElement = createElement('div', ['popup__info-wrapper']);
    const infoTagsWrapper:HTMLElement = createElement('div', ['popup__info-tags-wrapper']);
    const infoTagHealth:HTMLElement = createElement('span', ['popup__info-tag', 'popup__info-tag--health'], 'health')
    const infoTagWork:HTMLElement = createElement('span', ['popup__info-tag', 'popup__info-tag--work'], 'work')
    const infoTagHome:HTMLElement = createElement('span', ['popup__info-tag', 'popup__info-tag--home'], 'home')
    const infoTagOther:HTMLElement = createElement('span', ['popup__info-tag', 'popup__info-tag--other'], 'other')
    const infoDateWrapper:HTMLElement = createElement('div', ['popup__info-date-input-wrapper'], popupDateValue);
    const dateInput:HTMLElement = createElement('input', ['popup__info-date-input'], null, [{name: 'type', value: 'date'}])
    const buttonsWrapper:HTMLElement = createElement('div', ['popup__buttons-wrapper']);
    const cancelButton:HTMLElement = createElement('button', ['popup__buttons', 'popup__buttons-cancel'], 'Cancel', [{name: 'type', value: 'button'}]);
    const addButton:HTMLElement = createElement('button', ['popup__buttons', 'popup__buttons-add', 'popup__buttons-add--disabled'], 'Add Task', [{name: 'type', value: 'button'}]);
    function addNewTask():void {
        const taskDataTemplate:Task = 
        {   updatedAt: Date.now(),
            title: popupTextInputValue,
            isCompleted: false,
            tag: popupTagValue,
            date: popupDateValue
          }
        postTask(taskDataTemplate)
        .then(res => res.json())
        .catch(err => console.error(err, err.message))
        .then(resJson => {
            App.state.tasks.incompleted.push(resJson);
            updateComponent(AllTasks, App.state.tasks, 'all-tasks');
            closePopup();
        })   
    }
    function validate():void {
        if(popupTextInputValue.replace(/\s/g, '') !== '' && popupTagValue !== ''){
            addButton.addEventListener("click", addNewTask);
            addButton.classList.remove('popup__buttons-add--disabled');

        } else {
            addButton.removeEventListener("click", addNewTask);
            addButton.classList.add('popup__buttons-add--disabled');
        }
    }
    function addText():void{
        popupTextInputValue = input?.value;
        validate();
    }
    function addInfoTag(e: Event):void{
        let tagValue = (e.target as HTMLInputElement).innerText;
        infoTagHealth.classList.remove(`popup__info-tag--health--selected`);
        infoTagWork.classList.remove(`popup__info-tag--work--selected`);
        infoTagHome.classList.remove(`popup__info-tag--home--selected`);
        infoTagOther.classList.remove(`popup__info-tag--other--selected`);
        if(tagValue == popupTagValue){
            tagValue = '';
        } else {
            (e.target as HTMLInputElement).classList.add(`popup__info-tag--${tagValue}--selected`);
        }
        
        switch (tagValue) {
            case 'health':
                popupTagValue = 'health'
              break;
            case 'work':
                popupTagValue = 'work'
              break;
            case 'home':
                popupTagValue = 'home'
              break;
            case 'other':
                popupTagValue = 'other'
              break; 
            default:
                popupTagValue = ''
          }
          validate();
    }
    function addDate(e: Event):void{
        const inputValue = (e.target as HTMLInputElement).value;
        const dd = inputValue.slice(8, 10);
        const mm = inputValue.slice(5, 7);
        const yyyy = inputValue.slice(0, 4);
        popupDateValue = `${dd}.${mm}.${yyyy}`;
        infoDateWrapper.textContent = popupDateValue;
        infoDateWrapper.append(dateInput);
    }
    function closePopup():void{
        togglePopup(popup);
    }
    cancelButton.onclick = closePopup;
    input.oninput = addText;
    infoTagHealth.onclick = addInfoTag;
    infoTagWork.onclick = addInfoTag;
    infoTagHome.onclick = addInfoTag;
    infoTagOther.onclick = addInfoTag;
    dateInput.onchange = addDate;
    infoTagsWrapper.append(infoTagHealth, infoTagWork, infoTagHome, infoTagOther);
    infoDateWrapper.append(dateInput);
    infoWrapper.append(infoTagsWrapper, infoDateWrapper);
    buttonsWrapper.append(cancelButton, addButton);
    popup.append(title, input, infoWrapper,buttonsWrapper);
    return popup;
}