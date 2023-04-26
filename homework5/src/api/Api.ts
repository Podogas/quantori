import  {weatherApiKey, weatherApiUrl, dbUrl} from '../utils/env';
import {App, renderApp, updateComponent} from '../index';
import Header from '../components/Header/Header';
import {Task, State} from '../utils/Interfaces';



function getAllTasks(): Promise<{completed: Array<object>, incompleted: Array<object>}> {
    const dbData: { tasks: { completed: Array<object>, incompleted: Array<object> } } = { tasks: { completed: [], incompleted: [] }};
    return fetch(`${dbUrl}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
    .then((resJson: Array<object>) => {
        if(resJson){
            dbData.tasks.completed = [];
            dbData.tasks.incompleted = [];
            resJson.map((el: { isCompleted: boolean, updatedAt: number }) => el.isCompleted == true ? dbData.tasks.completed.push(el) :  dbData.tasks.incompleted.push(el));
            dbData.tasks.completed.sort((a: { updatedAt: number }, b: { updatedAt: number }) => a.updatedAt - b.updatedAt);
            dbData.tasks.incompleted.sort((a: { updatedAt: number }, b: { updatedAt: number }) => a.updatedAt - b.updatedAt);                
        }
        return dbData.tasks;
    });
}

function postTask(data: Task): Promise<Response> {
    return fetch(`${dbUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

function deleteTask(id: string):Promise<Response> {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

function updateTask(data: Task, id: string):Promise<Response> {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then( res => res.json())
    .catch((err) => console.error(err.message, err))
}

function getWeather(query: string):
Promise<{
    iconUrl: string;
    location: string;
    temp: number;
}> {
    return fetch( `${weatherApiUrl}?key=${weatherApiKey}&q=${query}&aqi=no`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.ok ? res.json() : undefined)
    .catch((err) => console.error(err.message, err))
    .then( resJson => {
        if(resJson){
            const weatherData: {iconUrl: string, location: string, temp: number} = {} as {iconUrl: string, location: string, temp: number};
            weatherData.iconUrl = resJson.current.condition.icon;
            weatherData.location = resJson.location.name;
            weatherData.temp = resJson.current.temp_c;
            return weatherData;
        }
    })
}
function onAcceptGeo(position: GeolocationPosition):void {
    getWeather(`${position.coords.latitude},${position.coords.longitude}`)
    .then(res => {
        App.state.weatherData = res;
        updateComponent( Header, App.state.weatherData, 'header');
    })
    .catch((err) => console.error(err.message, err))
}
function onDeclineGeo():void {
    console.warn('You have blocked site from getting your location, location is now set to default (Tbilisi)')
} 

function fetchDataByApi():void {
    Promise.all([
        getAllTasks(),
        getWeather(`tbilisi`),
    ])
    .then((data) => {
        const tasks = data[0];
        const weatherData = data[1];
        return {tasks, weatherData};
      })
    .then((apiData:State )=> {
        // pages for 500
        apiData.tasks ? App.state.tasks = apiData.tasks : console.log('ERROR WITH DB');
        // smth to inform that failed to fetch
        apiData.weatherData ? App.state.weatherData = apiData.weatherData : console.log('failed to fetch weather')
        
        return apiData;
    })
    .catch((err) => console.error(err.message, err))
    .then(() => {
        renderApp();
    })
    .then(() => navigator.geolocation.getCurrentPosition(onAcceptGeo, onDeclineGeo))
    
}















export {getWeather, getAllTasks, postTask, deleteTask, updateTask, fetchDataByApi};