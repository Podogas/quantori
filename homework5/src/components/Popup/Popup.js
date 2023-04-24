import './Popup.css';
import {createElement, formatDate} from '../../utils/Utils.js';
import { postTask } from '../../api/Api';
import { togglePopup, App, updateComponent } from '../../index.js';
import AllTasks from '../AllTasks/AllTasks';
export default function Popup() {
    let popupTextInputValue = '';
    let popupTagValue = '';
    let popupDateValue = `${formatDate(new Date())}`;
    const popup = createElement('section', ['popup'],);
    const title = createElement('h2', ['popup__title'], 'Add New Task');
    const input = createElement('input', ['popup__input'], null, [{name: 'type',value: 'text'},{name: 'placeholder' ,value: 'Task Title'}]);
    const infoWrapper = createElement('div', ['popup__info-wrapper']);
    const infoTagsWrapper = createElement('div', ['popup__info-tags-wrapper']);
    const infoTagHealth = createElement('span', ['popup__info-tag', 'popup__info-tag--health'], 'health')
    const infoTagWork = createElement('span', ['popup__info-tag', 'popup__info-tag--work'], 'work')
    const infoTagHome = createElement('span', ['popup__info-tag', 'popup__info-tag--home'], 'home')
    const infoTagOther = createElement('span', ['popup__info-tag', 'popup__info-tag--other'], 'other')
    const infoDateWrapper = createElement('div', ['popup__info-date-input-wrapper'], popupDateValue);
    const dateInput = createElement('input', ['popup__info-date-input'], null, [{name: 'type', value: 'date'}])
    const buttonsWrapper = createElement('div', ['popup__buttons-wrapper']);
    const cancelButton = createElement('button', ['popup__buttons', 'popup__buttons-cancel'], 'Cancel', [{name: 'type', value: 'button'}]);
    const addButton = createElement('button', ['popup__buttons', 'popup__buttons-add', 'popup__buttons-add--disabled'], 'Add Task', [{name: 'type', value: 'button'}]);
    function addNewTask() {
        const taskDataTemplate = 
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
    function validate() {
        if(popupTextInputValue.replace(/\s/g, '') !== '' && popupTagValue !== ''){
            addButton.addEventListener("click", addNewTask);
            addButton.classList.remove('popup__buttons-add--disabled');

        } else {
            addButton.removeEventListener("click", addNewTask);
            addButton.classList.add('popup__buttons-add--disabled');
        }
    }
    function addText(){
        popupTextInputValue = input.value;
        validate();
    }
    function addInfoTag(e){
        let tagValue = e.target.innerText;
        infoTagHealth.classList.remove(`popup__info-tag--health--selected`);
        infoTagWork.classList.remove(`popup__info-tag--work--selected`);
        infoTagHome.classList.remove(`popup__info-tag--home--selected`);
        infoTagOther.classList.remove(`popup__info-tag--other--selected`);
        if(tagValue == popupTagValue){
            tagValue = '';
        } else {
            e.target.classList.add(`popup__info-tag--${tagValue}--selected`);
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
    function addDate(e){
        const inputValue = e.target.value;
        const dd = inputValue.slice(8, 10);
        const mm = inputValue.slice(5, 7);
        const yyyy = inputValue.slice(0, 4);
        popupDateValue = `${dd}.${mm}.${yyyy}`;
        infoDateWrapper.textContent = popupDateValue;
        infoDateWrapper.append(dateInput);
    }
    function closePopup(){
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