import './main.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import AllTasks from './components/AllTasks/AllTasks';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import Modal from './components/Modal/Modal';
import Popup from './components/Popup/Popup';
import { formatDate } from './utils/Utils';
import {fetchDataByApi } from './api/Api';
import {State} from './utils/Interfaces';
const appContainer:HTMLElement = document.getElementById("functional-example");

function togglePopup(popup: HTMLElement | undefined):void{
    popup ? appContainer.removeChild(popup) : appContainer.append(Popup());   
}

function deleteComponent(component: HTMLElement, parentSelector: string):void {
    const parentElement = appContainer.querySelector(parentSelector)
    parentElement.removeChild(component)
}

function updateComponent(component: Function, data: object, selector: string):void {
    const htmlElement = appContainer.querySelector(`.${selector}`)
    htmlElement.replaceWith(component(data));
}

function checkIfModalWasShown():void {
    const date = new Date;
    function getArrayOfTasksForToday():object[] {
        const arrayForToday:object[] = App.state.tasks.incompleted.filter((task) => task.date == formatDate(date));
        return arrayForToday;
    }
    const lastVisit = window.localStorage.getItem('last-visit');
    const arr =  getArrayOfTasksForToday();
    if(!lastVisit && arr.length != 0){
        window.localStorage.setItem('last-visit', `${date.getDate()}`);
        appContainer.append(Modal(arr));
    }
}

function App():HTMLElement {
    appContainer.append(Header(), Nav(), AllTasks(App.state.tasks), CompletedTasks());
    return appContainer;
}
const initialState:State ={
    tasks: {
        completed:[],
        incompleted:[]
    },
    weatherData: {
       iconUrl: '',
       location: '',
       temp: 0 
    }
}

App.state = initialState

function renderApp():void {
    App(); 
    checkIfModalWasShown();
}

fetchDataByApi();
export {updateComponent, deleteComponent, togglePopup, checkIfModalWasShown, App, renderApp, appContainer};