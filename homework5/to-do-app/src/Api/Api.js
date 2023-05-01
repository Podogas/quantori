import {TaskType,WeatherDataType} from '../Utils/Interfaces';
import  {weatherApiKey, weatherApiUrl, dbUrl} from '../Utils/env';
import { formateWeather } from '../Utils/Utils';
import { HttpErrorsHandler } from '../Utils/Errors';
import { useState } from 'react';

const httpHeader = {
    "Content-Type": "application/json",
}
// const checkRes = () => {
    // mb make this function to follow DRY principles
// }
// сортировка по дате изменения
const getTasks = () => {
    return fetch(`${dbUrl}/tasks`, {
        method: "GET",
        headers: httpHeader
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            throw HttpErrorsHandler(res);
        }
    })
    .then(res => res)
}
const postTask = (data) => {
    return fetch(`${dbUrl}/tasks`, {
        method: "POST",
        headers: httpHeader,
        body: JSON.stringify(data),
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            throw HttpErrorsHandler(res);
        }
    })
    .then(res => res)
}
const deleteTask = (id) => {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "DELETE",
        headers: httpHeader 
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        } else {
            throw HttpErrorsHandler(res);
        }
    })
    .then(res => res)
}
const updateTask = (data,id) => {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "PUT",
        headers: httpHeader,
        body: JSON.stringify(data), 
    })
    .then((res) => {
        if(res.ok){
            console.log(data)
            return res.json();
        } else {
            throw HttpErrorsHandler(res);
        }
    })
    .then(res => res)
}      

const defaultPosition = 'Yerevan';
const onAcceptGeo = (position) => {
    const positionQueryString = `${position.coords.latitude},${position.coords.longitude}`;
     return getWeather(positionQueryString)
}
const onDeclineGeo = () => {
    console.warn(`You have blocked site from getting your location, location is now set to default (${defaultPosition})`)
}
const getWeather = (query) => {
    const _query = query ? query : defaultPosition;
    return fetch(`${weatherApiUrl}?key=${weatherApiKey}&q=${_query}&aqi=no`, {
        method: "GET",
        headers: httpHeader     
    })
    .then((res) => {
        if(res.ok){
           return  res.json();
        } else {
            throw HttpErrorsHandler(res);
        }
    })
    .then((res) => {
        return formateWeather(res)
    })
}
export {getTasks, postTask, deleteTask, updateTask, getWeather, onAcceptGeo, onDeclineGeo};