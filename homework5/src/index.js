import './main.css';
import Header from './components/Header/Header.js';
import Nav from './components/Nav/Nav.js';
import AllTasks from './components/AllTasks/AllTasks.js';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import Modal from './components/Modal/Modal';
import Popup from './components/Popup/Popup';
import { formatDate } from './utils/Utils';
import {fetchDataByApi } from './api/Api';



const appContainer = document.getElementById("functional-example");
function togglePopup(popup){
    popup ? appContainer.removeChild(popup) : appContainer.append(Popup());   
}

function deleteComponent(component, parentSelector) {
    const parentElement = appContainer.querySelector(parentSelector)
    parentElement.removeChild(component)
}

function updateComponent(component, data, selector) {
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
        window.localStorage.setItem('last-visit', date.getDate());
        appContainer.append(Modal(arr));
    }
}
 
App.state = {
    tasks: {},
    weatherData: {},
}
function App() {
    appContainer.append(Header(), Nav(), AllTasks(App.state.tasks), CompletedTasks());
    return appContainer;
}
function renderApp() {
    App(); 
    checkIfModalWasShown();
}
fetchDataByApi();
export {updateComponent, deleteComponent, togglePopup, checkIfModalWasShown, App, renderApp};