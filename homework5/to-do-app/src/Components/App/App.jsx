import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Popup from '../Popup/Popup';
import AllTasks from '../AllTasks/AllTasks';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { deleteTask, getTasks, getWeather, onAcceptGeo, onDeclineGeo, postTask, updateTask } from '../../Api/Api';
import { formatDate } from '../../Utils/Utils';
import {TaskType,TasksType} from '../../Utils/Interfaces';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filteredResults, setFilteredRefult] = useState([]);
  const [filterOn, setFilterOn] = useState(false)
  const [weather, setWeather] = useState({icon:{url:'',description:''}, locationName:'', temp:''});
  const [popupType, setPopupType] = useState(false);
  const [tasksForToday, setTasksForToday] = useState([]);

  const acceptGeoHandler = (position) => {
    onAcceptGeo(position)
    .then(res => setWeather(res))
    .catch(err => console.error(err.message))
  }
  const onDeclineGeoHandler = () => {
    onDeclineGeo();
    getWeather()
    .then(res => setWeather(res))
    .catch(err => console.error(err.message))
  }

  useEffect(() => {
    getTasks()
    .then( res => {
      setTasks(res)
      setFilteredRefult(res.filter(task => task.isCompleted === false))
      setIncompletedTasks(res.filter(task => task.isCompleted === false))
      setCompletedTasks(res.filter(task => task.isCompleted === true))
      setTasksForToday(res.filter(task => task.isCompleted === false && task.date === formatDate(new Date())))
    })
    .catch(err => console.error(err.message));
    navigator.geolocation.getCurrentPosition(acceptGeoHandler, onDeclineGeoHandler);  
  }, [])

  useEffect(() => {
    setCompletedTasks(tasks.filter(task => task.isCompleted));
    setFilterOn(false)
  },[tasks])

  useEffect(() => {
    setIncompletedTasks(tasks.filter(task => !task.isCompleted));
    setFilterOn(false)
  },[tasks])

  useEffect(()=> {
    const lastVisit = window.localStorage.getItem('last-visit');
      if(lastVisit !== formatDate(new Date())){
        setPopupType('modal');
        window.localStorage.setItem('last-visit', formatDate(new Date()));
      }
  },[tasksForToday])

  const moveTaskHandler = (task, checkboxEl) => {
      const updatedTasks = tasks.map(t => {
        if(t.id !== task.id){
          return t;
        } else {
          return { ...t, isCompleted: !t.isCompleted };
        } 
      })
      task.isCompleted = !task.isCompleted;
      updateTask(task, task.id)
      setTasks(updatedTasks)
      setFilterOn(false)    
  }

  const deleteHandler = (tasks, id) => {
    setIncompletedTasks(tasks);
    deleteTask(id)
  }
  const filterHandler = (value) => {
    if(value) {
      setFilterOn(true)
      setFilteredRefult(value)
    } else {
      setFilterOn(false)
    }
    
  }
  const addTaskHandler = (data) => {
    postTask(data)
    .then(res => {
      setTasks([...tasks, res])
      setPopupType(false)
    })
  }
  return (
    <>
      <Header weather={weather}/>
      <Nav 
        incompletedTasks={incompletedTasks}
        filterHandler={filterHandler}
        filterOn={filterOn}
        setPopupType={setPopupType}
      />
      <AllTasks 
        deleteHandler={deleteHandler} 
        incompletedTasks={incompletedTasks} 
        setIncompletedTasks={setIncompletedTasks} 
        filteredResults={filteredResults} 
        moveTaskHandler={moveTaskHandler} 
        filterOn={filterOn}
      />
      <CompletedTasks 
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks} 
        moveTaskHandler={moveTaskHandler}
      />
      {popupType ? 
        <Popup 
          popupType={popupType}
          setPopupType={setPopupType} 
          addTaskHandler={addTaskHandler} 
          tasksForToday={tasksForToday}
        /> 
      : null
      }
      
    </>
    

  );
}

export default App;

