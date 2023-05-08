import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Popup from '../Popup/Popup';
import AllTasks from '../AllTasks/AllTasks';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import { deleteTask, getTasks, postTask, updateTask } from '../../Api/Api';
import { formatDate, isArraysEqual } from '../../Utils/Utils';
import {TaskType} from '../../Utils/Interfaces';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTasks } from '../../store/features/tasksSlice';

const App = () => {
  const [initialTasks, setInitialTasks] = useState<TaskType[]>([]);
  const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
  const [filteredResults, setFilteredRefult] = useState<TaskType[]>([]);
  const [filterOn, setFilterOn] = useState(false)
  const [popupType, setPopupType] = useState<boolean | string>(false);
  const [tasksForToday, setTasksForToday] = useState([]);
  const [popupContent, setPopupContent] = useState<TaskType | undefined>();

  const [pathName, setPathName] = useState(useLocation().pathname);
  
  ///
   const dispatch = useAppDispatch();
   useEffect(() => {
     dispatch(fetchTasks())
   },[]);
 
  // const filterByTag = () => {
  //   switch(pathName.replace('/','')){
  //     case('home'):

  //   }
  // }
  const tasks = useAppSelector((state) => state.tasks);
  console.log(tasks, "SELECTOR")


  //
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

      //
    
      //
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
      if(isMounted && lastVisit && lastVisit !== formatDate(new Date())){
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

const moveTaskHandler = useCallback((task: TaskType) => {
  const isTaskCompleted = task.isCompleted;
  const updatedIncompletedTasks = incompletedTasks.filter(
    (t) => t.id !== task.id
  );
  const updatedCompletedTasks = completedTasks.filter(
    (t) => t.id !== task.id
  );
  task.isCompleted = !isTaskCompleted;
  const updatedTask = { ...task };
  if (!isTaskCompleted) {
    updatedCompletedTasks.push(updatedTask);
  } else {
    updatedIncompletedTasks.push(updatedTask);
  }
  setIncompletedTasks(updatedIncompletedTasks);
  setCompletedTasks(updatedCompletedTasks);
  updateTask(updatedTask);
}, [incompletedTasks, completedTasks]);


const deleteHandler = useCallback((id:string) => {
    const tasksAfterDeletion:TaskType[] = incompletedTasks.filter((a:TaskType) => a.id!==id)
    setIncompletedTasks(tasksAfterDeletion)
    deleteTask(id)
  }, [incompletedTasks])
///
const editTaskHandler = useCallback((task:TaskType, id:string|undefined) => {
  updateTask(task)
  .then(res => {
    const updatedTasks = incompletedTasks.filter((t) => t.id !== id)
    updatedTasks.push(res); 
    setIncompletedTasks(updatedTasks)
    setPopupType(false)
  })
  .catch(err => console.error(err))
  
}, [incompletedTasks])

/// add filter for tasks by query and by tags////
const filterHandler = useCallback((value:{title:string, tag:string} | undefined) => {
  if(value){
    if(value?.title.length !== 0) {
     
      const filtered:TaskType[] = incompletedTasks.filter((a) => {
          return a.title.toLowerCase().includes(value.title.toLowerCase())
          })
      // if(!isArraysEqual(filteredResults, filtered)){
      // }      
    }
    if(value?.tag.length !== 0){
    
      const filtered:TaskType[] = incompletedTasks.filter((a) => {
        return a.tag === value?.tag
        })
    // if(!isArraysEqual(filteredResults, filtered)){
    
    // }   
    }
    // if(!filterOn) {
    //   setFilterOn(true);
    // }
    if(value?.title.length === 0 && value.tag.length === 0) {
   
      setFilterOn(false)
    }
  }
  
   
  }, [incompletedTasks, filterOn, filteredResults]);

  return (
    <>
      <Header/>
      <Nav
        pathName={pathName}
        setPathName={setPathName}
        filterHandler={filterHandler}
        setPopupType={setPopupType}
      />
      <AllTasks 
        deleteHandler={deleteHandler}
        filteredResults={filteredResults} 
        moveTaskHandler={moveTaskHandler}
        filterOn={filterOn}
        setPopupType={setPopupType}
        setPopupContent={setPopupContent}

      />
      <CompletedTasks 
        moveTaskHandler={moveTaskHandler}
        setPopupType={setPopupType}
        setPopupContent={setPopupContent}
      />
      {popupType ? 
        <Popup 
          popupType={popupType}
          popupContent={popupContent}
          setPopupType={setPopupType} 
          tasksForToday={tasksForToday}
          editTaskHandler={editTaskHandler}
        /> 
      : null
      }  
    </>
  );
}

export default App;

