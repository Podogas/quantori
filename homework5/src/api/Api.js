import  {weatherApiKey, weatherApiUrl, dbUrl} from '../utils/env.js';
import {App, renderApp, updateComponent} from '../index.js';
import Header from '../components/Header/Header.js';

function getAllTasks() {
    const dbData = {};
    return fetch( `${dbUrl}/tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then( res => res.json())
    .catch(err => console.error(err))
    .then(resJson => {
        if(resJson){
            dbData['tasks'] = {completed: [], incompleted: []};
            resJson.map(el => el.isCompleted == true ? dbData.tasks.completed.push(el) :  dbData.tasks.incompleted.push(el));
            dbData.tasks.completed.sort((a, b) => a.updatedAt - b.updatedAt);
            dbData.tasks.incompleted.sort((a, b) => a.updatedAt - b.updatedAt);                
        }
        return dbData.tasks;
    })
}
function postTask(data) {
    return fetch( `${dbUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

function deleteTask(id) {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

function updateTask(data, id) {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then( res => res.json())
}

function getWeather(query) {
    return fetch( `${weatherApiUrl}?key=${weatherApiKey}&q=${query}&aqi=no`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.ok ? res.json() : undefined)
    .then( resJson => {
        if(resJson){
            const weatherData = {};
            weatherData['iconUrl'] = resJson.current.condition.icon;
            weatherData['location'] = resJson.location.name;
            weatherData['temp'] = resJson.current.temp_c;
            return weatherData;
        }
    })
}
function onAcceptGeo(position) {
    getWeather(`${position.coords.latitude},${position.coords.longitude}`)
    .then(res => {
        App.state.weatherData = res;
        updateComponent( Header, App.state.weatherData, 'header');
    })
}
function onDeclineGeo() {
    console.warn('You have blocked site from getting your location, location is now set to default (Tbilisi)')
} 

function fetchDataByApi() {
    Promise.all([
        getAllTasks(),
        getWeather(`tbilisi`),
    ])
    .then((data) => {
        const tasks = data[0];
        const weatherData = data[1];
        return {tasks, weatherData};
      })
    .then((apiData )=> {
        // pages for 500
        apiData.tasks ? App.state.tasks = apiData.tasks : console.log('ERROR WITH DB');
        // smth to inform that failed to fetch
        apiData.weatherData ? App.state.weatherData = apiData.weatherData : console.log('failed to fetch weather')
        
        return apiData;
    })
    .then(() => {
        renderApp();
    })
    .then(() => navigator.geolocation.getCurrentPosition(onAcceptGeo, onDeclineGeo))
    
}















export {getWeather, getAllTasks, postTask, deleteTask, updateTask, fetchDataByApi};