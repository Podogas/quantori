import {TaskType,WeatherDataType} from '../Utils/Interfaces';
import  {weatherApiKey, weatherApiUrl, dbUrl} from '../Utils/env';
import { formateWeather } from '../Utils/Utils';
import { HttpErrorsHandler } from '../Utils/Errors';
import { useState } from 'react';

const httpHeader = {
    "Content-Type": "application/json",
}
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
const postTask = (data:TaskType) => {
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
const deleteTask = (id:string) => {
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
const updateTask = (data:TaskType,id:string|undefined) => {
    return fetch( `${dbUrl}/tasks/${id}`, {
        method: "PUT",
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

const defaultPosition = 'Tbilisi';
const onAcceptGeo = (position:GeolocationPosition) => {
    const positionQueryString = `${position.coords.latitude},${position.coords.longitude}`;
     return getWeather(positionQueryString)
}
const onDeclineGeo = () => {
    console.warn(`You have blocked site from getting your location, location is now set to default (${defaultPosition})`);
    return getWeather();
}
const getWeather = (query?:string) => {
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