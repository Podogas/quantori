import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Popup from '../Popup/Popup';
import AllTasks from '../AllTasks/AllTasks';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { deleteTask, getTasks, postTask, updateTask } from '../../Api/Api';
import { formatDate, isArraysEqual } from '../../Utils/Utils';
import {TaskType} from '../../Utils/Interfaces';
const App = () => {
  const [initialTasks, setInitialTasks] = useState<TaskType[]>([]);
  const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
  const [filteredResults, setFilteredRefult] = useState<TaskType[]>([]);
  const [filterOn, setFilterOn] = useState(false)
  const [popupType, setPopupType] = useState<boolean | string>(false);
  const [tasksForToday, setTasksForToday] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getTasks()
    .then( res => {
      if (isMounted){
      setInitialTasks(res)
      const [completed, incompleted] = res.reduce((acc:Array<TaskType[]>, task:TaskType) => {
        task.isCompleted ? acc[0].push(task) : acc[1].push(task);
        return acc;
      }, [[], []]);
      setFilteredRefult(incompleted);
      setIncompletedTasks(incompleted);
      setCompletedTasks(completed);
      setTasksForToday(incompleted.filter((task:TaskType) => task.date === formatDate(new Date())));
      }
    })
    .catch(err => console.error(err.message));
    return () => {
      isMounted = false;
    };
  }, [])

useEffect(() => {
    setCompletedTasks(initialTasks.filter((task:TaskType) => task.isCompleted));
  },[initialTasks])

useEffect(() => {
    setIncompletedTasks(initialTasks.filter((task:TaskType) => !task.isCompleted));
  },[initialTasks])

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

const addTaskHandler = useCallback((data:TaskType) => {
    postTask(data)
    .then(res => {
      setIncompletedTasks([...incompletedTasks, res])
      setPopupType(false)
    })
  }, [incompletedTasks])
const moveTaskHandler = useCallback((task:TaskType) => {
    if(!task.isCompleted){
      const updatedIncompletedTasks = incompletedTasks.filter( t => t.id !== task.id);
      task.isCompleted = !task.isCompleted;
      const updatedCompletedTasks = [...completedTasks, task];
      setIncompletedTasks(updatedIncompletedTasks);
      setCompletedTasks(updatedCompletedTasks);
      updateTask(task, task.id);
      return
    }
    if(task.isCompleted){
      const updatedCompletedTasks = completedTasks.filter( t => t.id !== task.id);
      task.isCompleted = !task.isCompleted;
      const updatedIncompletedTasks = [...incompletedTasks, task];
      setCompletedTasks(updatedCompletedTasks);
      setIncompletedTasks(updatedIncompletedTasks);
      updateTask(task, task.id);
      return
    } 
  },[incompletedTasks, completedTasks])

const deleteHandler = useCallback((id:string) => {
    const tasksAfterDeletion:TaskType[] = incompletedTasks.filter((a:TaskType) => a.id!==id)
    setIncompletedTasks(tasksAfterDeletion)
    deleteTask(id)
  }, [incompletedTasks])

const filterHandler = useCallback((value:string | undefined) => {
    if(value) {
      const filtered:TaskType[] = incompletedTasks.filter((a) => {
          return a.title.toLowerCase().includes(value.toLowerCase())
          })
      if(!filterOn) {
        setFilterOn(true);
      }
      if(!isArraysEqual(filteredResults, filtered)){
        setFilteredRefult(filtered)
      }     
    } else {
      setFilterOn(false)
    }  
  }, [incompletedTasks, filterOn, filteredResults]);

  return (
    <>
      <Header/>
      <Nav 
        filterHandler={filterHandler}
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

