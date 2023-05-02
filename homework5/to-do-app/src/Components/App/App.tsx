import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Popup from '../Popup/Popup';
import AllTasks from '../AllTasks/AllTasks';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { deleteTask, getTasks, getWeather, onAcceptGeo, onDeclineGeo, postTask, updateTask } from '../../Api/Api';
import { formatDate } from '../../Utils/Utils';
import {TaskType, WeatherDataType} from '../../Utils/Interfaces';
const App = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
  const [filteredResults, setFilteredRefult] = useState<TaskType[]>([]);
  const [filterOn, setFilterOn] = useState(false)
  const [weather, setWeather] = useState<WeatherDataType | undefined>({icon:{url:'',description:''}, locationName:'', temp:''});
  const [popupType, setPopupType] = useState<boolean | string>(false);
  const [tasksForToday, setTasksForToday] = useState([]);

  const acceptGeoHandler = (position:GeolocationPosition) => {
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
    let isMounted = true;
    getTasks()
    .then( res => {
      if (isMounted){
      setTasks(res)
      setFilteredRefult(res.filter((task:TaskType) => task.isCompleted === false))
      setIncompletedTasks(res.filter((task:TaskType) => task.isCompleted === false))
      setCompletedTasks(res.filter((task:TaskType) => task.isCompleted === true))
      setTasksForToday(res.filter((task:TaskType) => task.isCompleted === false && task.date === formatDate(new Date())))
      }
    })
    .catch(err => console.error(err.message));
    navigator.geolocation.getCurrentPosition(acceptGeoHandler, onDeclineGeoHandler); 
    return () => {
      isMounted = false;
    };
  }, [])

  useEffect(() => {
    setCompletedTasks(tasks.filter((task:TaskType) => task.isCompleted));
    setFilterOn(false)
  },[tasks])

  useEffect(() => {
    setIncompletedTasks(tasks.filter((task:TaskType) => !task.isCompleted));
    setFilterOn(false)
  },[tasks])

  useEffect(()=> {
    let isMounted = true;
    const lastVisit = window.localStorage.getItem('last-visit');
      if(isMounted && lastVisit !== formatDate(new Date())){
        setPopupType('modal');
        window.localStorage.setItem('last-visit', formatDate(new Date()));
      }
    return () => {
      isMounted = false;
    };
  },[tasksForToday])

  const moveTaskHandler = (task:TaskType) => {
      const updatedTasks:TaskType[] = tasks.map((t:TaskType) => {
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

  const deleteHandler = (id:string) => {
    const tasksAfterDeletion:TaskType[] = tasks.filter((a:TaskType) => a.id!==id)
    setTasks(tasksAfterDeletion);
    deleteTask(id)
  }
  const filterHandler = (value:TaskType[]) => {
    if(value.length !== 0) {
      setFilterOn(true)
      setFilteredRefult(value)
    } else {
      setFilterOn(false)
    }
    
  }
  const addTaskHandler = (data:TaskType) => {
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
        filteredResults={filteredResults} 
        moveTaskHandler={moveTaskHandler} 
        filterOn={filterOn}
      />
      <CompletedTasks 
        completedTasks={completedTasks}
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

