import { useEffect, useState } from 'react';
import './App.css';
import {Header} from '../Header/Header';
import {Nav} from '../Nav/Nav';
import {Popup} from '../Popup/Popup';
import {AllTasks} from '../AllTasks/AllTasks';
import {CompletedTasks} from '../CompletedTasks/CompletedTasks';
import { formatDate } from '../../Utils/Utils';
import {TaskType} from '../../Utils/Interfaces';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTasks, updateTasksList } from '../../store/features/tasksSlice';

const App = () => {
  const [popupType, setPopupType] = useState<boolean | string>(false);
  const [popupContent, setPopupContent] = useState<TaskType | TaskType[] |undefined>();
  const [filter, setFilter] = useState({tag:'', query:''});
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const handleStorage = (e:StorageEvent) => {
    if (e.key === "tasks" && e.newValue) {
      dispatch(updateTasksList(JSON.parse(e.newValue)));
    }
  };
  useEffect(() => {
    dispatch(fetchTasks())
    .then(res => shouldShowModal(res.payload))
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  },[]);
  const shouldShowModal = (tasks:TaskType[]) => {
    const lastVisit = window.localStorage.getItem('last-visit');
    if( lastVisit && lastVisit !== formatDate(new Date())){
      const tasksForToday = tasks.filter(task => task.date === lastVisit && task.isCompleted === false)
      if(tasksForToday.length !== 0){
        setPopupContent(tasksForToday)
        setPopupType('modal');  
        window.localStorage.setItem('last-visit', formatDate(new Date()));
      }
    } if (!lastVisit){
      const tasksForToday = tasks.filter(task => task.date === formatDate(new Date()) && task.isCompleted === false)
      if(tasksForToday.length !== 0){
        setPopupContent(tasksForToday)
        setPopupType('modal'); 
        window.localStorage.setItem('last-visit', formatDate(new Date()));
      }
    }
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },
  [tasks]);
  useEffect(()=> {
    if(!popupType){
      setPopupContent(undefined)
    }
  },
  [popupType])

  return (
    <Routes>
      <Route path="/tasks/*" element={
      <>
        <Header/>
        <Nav
          setPopupContent={setPopupContent}
          setFilter={setFilter}
          setPopupType={setPopupType}
        />
        <AllTasks 
          filter={filter}
          setPopupType={setPopupType}
          setPopupContent={setPopupContent}
        />
        <CompletedTasks 
          setPopupType={setPopupType}
          setPopupContent={setPopupContent}
        />
        {popupType ? 
          <Popup 
            popupType={popupType}
            popupContent={popupContent}
            setPopupType={setPopupType} 
          /> 
        : null
        }
      </>
      }/> 
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}
export  {App};