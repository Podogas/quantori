import './main.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import AllTasks from './components/AllTasks/AllTasks';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import Modal from './components/Modal/Modal';
import Popup from './components/Popup/Popup';
import { formatDate } from './utils/Utils';
import {fetchDataByApi } from './api/Api';
const appContainer = document.getElementById("functional-example");

function togglePopup(popup: HTMLElement | undefined){
    popup ? appContainer.removeChild(popup) : appContainer.append(Popup());   
}

function deleteComponent(component: HTMLElement, parentSelector: string) {
    const parentElement = appContainer.querySelector(parentSelector)
    parentElement.removeChild(component)
}

function updateComponent(component: Function, data: object, selector: string) {
    const htmlElement = appContainer.querySelector(`.${selector}`)
    htmlElement.replaceWith(component(data));
}

function checkIfModalWasShown() {
    const date = new Date;
    function getArrayOfTasksForToday() {
        const arrayForToday = App.state.tasks.incompleted.filter((task) => task.date == formatDate(date));
        return arrayForToday;
    }
    const lastVisit = window.localStorage.getItem('last-visit');
    const arr =  getArrayOfTasksForToday();
    if(!lastVisit && arr.length != 0){
        console.log( date)
        window.localStorage.setItem('last-visit', `${date.getDate()}`);
        appContainer.append(Modal(arr));
    }
}

function App() {
    appContainer.append(Header(), Nav(), AllTasks(App.state.tasks), CompletedTasks());
    return appContainer;
}
App.state = {
    tasks: { incompleted:[], completed:[]},
    weatherData: {iconUrl: '', temp: 0, location: ''},
}

function renderApp() {
    App(); 
    checkIfModalWasShown();
}

fetchDataByApi();

export {updateComponent, deleteComponent, togglePopup, checkIfModalWasShown, App, renderApp};