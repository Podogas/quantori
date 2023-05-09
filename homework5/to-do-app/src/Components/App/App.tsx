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
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTasks, updateTasksList } from '../../store/features/tasksSlice';

const App = () => {
  // const [initialTasks, setInitialTasks] = useState<TaskType[]>([]);
  // const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);
  // const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
  // const [filteredResults, setFilteredRefult] = useState<TaskType[]>([]);
  // const [filterOn, setFilterOn] = useState(false)
  const [popupType, setPopupType] = useState<boolean | string>(false);
  // const [tasksForToday, setTasksForToday] = useState<TaskType[]>([]);
  const [popupContent, setPopupContent] = useState<TaskType | TaskType[] |undefined>();
  const [filter, setFilter] = useState({tag:'', query:''});
  // const [pathName, setPathName] = useState(useLocation().pathname);
  
  ///
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const handleStorage = (e:StorageEvent) => {
    if (e.key === "tasks" && e.newValue) {
      console.log(JSON.parse(e.newValue), 'NEW Value')
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
      console.log(tasksForToday, tasks,'tasks for today')
      if(tasksForToday.length !== 0){
        console.log('show')
        setPopupContent(tasksForToday)
        setPopupType('modal'); 
        window.localStorage.setItem('last-visit', formatDate(new Date()));
      }
    }
  }
  


   useEffect(() => {
    console.log(tasks,'tasks changed?')
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks]);
 
  useEffect(()=> {
    console.log(popupType, popupContent,'POPUPTYPE')
    if(!popupType){
      console.log('popupcontent now undefined'
      )
      setPopupContent(undefined)
    }
  },[popupType])

  return (
    <Routes>
      <Route path="/tasks/*" element={
      <>
        <Header/>
        <Nav
          //pathName={pathName}
          //setPathName={setPathName}
          setPopupContent={setPopupContent}
          setFilter={setFilter}
          setPopupType={setPopupType}
        />
        <AllTasks 
          // deleteHandler={deleteHandler}
          // filteredResults={filteredResults} 
          // moveTaskHandler={moveTaskHandler}
          // filterOn={filterOn}
          filter={filter}
          setPopupType={setPopupType}
          setPopupContent={setPopupContent}

        />
        <CompletedTasks 
          // moveTaskHandler={moveTaskHandler}
          setPopupType={setPopupType}
          setPopupContent={setPopupContent}
        />
        {popupType ? 
          <Popup 
            popupType={popupType}
            popupContent={popupContent}
            setPopupType={setPopupType} 
            // tasksForToday={tasksForToday}
            // editTaskHandler={editTaskHandler}
          /> 
        : null
        }
      </>
      }/> 
      <Route path="*" element={<Navigate to="/tasks" />} />
    </Routes>
  );
}













  // const filterByTag = () => {
  //   switch(pathName.replace('/','')){
  //     case('home'):

  //   }
  // }

  
   // EXPERIMENTAL!!!


  //
  // useEffect(() => {
  //   let isMounted = true;
  //   getTasks()
  //   .then( res => {
  //     if (isMounted){
  //     // setInitialTasks(res)
  //     const [completed, incompleted] = res.reduce((acc:Array<TaskType[]>, task:TaskType) => {
  //       task.isCompleted ? acc[0].push(task) : acc[1].push(task);
  //       return acc;
  //     }, [[], []]);
  //     setFilteredRefult(incompleted);
  //     // setIncompletedTasks(incompleted);
  //     setCompletedTasks(completed);
  //     setTasksForToday(tasks.uncompleted.filter((task:TaskType) => task.date === formatDate(new Date())));

  //     //
    
  //     //
  //     }
  //   })
  //   .catch(err => console.error(err.message));
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [])

// useEffect(() => {
//     setCompletedTasks(initialTasks.filter((task:TaskType) => task.isCompleted));
//   },[initialTasks])

// useEffect(() => {
//     setIncompletedTasks(initialTasks.filter((task:TaskType) => !task.isCompleted));
//   },[initialTasks])

// useEffect(()=> {
//   console.log(tasksForToday, 'tasks for today')
//     let isMounted = true;
//     const lastVisit = window.localStorage.getItem('last-visit');
//     console.log(isMounted,  lastVisit,  lastVisit !== formatDate(new Date()), "CONDITION")
//       if(isMounted && lastVisit && lastVisit !== formatDate(new Date())){
//         setPopupType('modal');
//         window.localStorage.setItem('last-visit', formatDate(new Date()));
//       }
//     return () => {
//       isMounted = false;
//     };
//   },[tasksForToday])

// const addTaskHandler = useCallback((data:TaskType) => {
//     postTask(data)
//     .then(res => {
//       setIncompletedTasks([...incompletedTasks, res])
//       setPopupType(false)
//     })
//   }, [incompletedTasks])

// const moveTaskHandler = useCallback((task: TaskType) => {
//   const isTaskCompleted = task.isCompleted;
//   const updatedIncompletedTasks = incompletedTasks.filter(
//     (t) => t.id !== task.id
//   );
//   const updatedCompletedTasks = completedTasks.filter(
//     (t) => t.id !== task.id
//   );
//   task.isCompleted = !isTaskCompleted;
//   const updatedTask = { ...task };
//   if (!isTaskCompleted) {
//     updatedCompletedTasks.push(updatedTask);
//   } else {
//     updatedIncompletedTasks.push(updatedTask);
//   }
//   setIncompletedTasks(updatedIncompletedTasks);
//   setCompletedTasks(updatedCompletedTasks);
//   updateTask(updatedTask);
// }, [incompletedTasks, completedTasks]);


// const deleteHandler = useCallback((id:string) => {
//     const tasksAfterDeletion:TaskType[] = incompletedTasks.filter((a:TaskType) => a.id!==id)
//     setIncompletedTasks(tasksAfterDeletion)
//     deleteTask(id)
//   }, [incompletedTasks])
///
// const editTaskHandler = useCallback((task:TaskType, id:string|undefined) => {
//   updateTask(task)
//   .then(res => {
//     const updatedTasks = incompletedTasks.filter((t) => t.id !== id)
//     updatedTasks.push(res); 
//     setIncompletedTasks(updatedTasks)
//     setPopupType(false)
//   })
//   .catch(err => console.error(err))
  
// }, [incompletedTasks])

/// add filter for tasks by query and by tags////





export default App;









//// BERORE APP REFACTORING


// import { useCallback, useEffect, useState } from 'react';
// import './App.css';
// import Header from '../Header/Header';
// import Nav from '../Nav/Nav';
// import Popup from '../Popup/Popup';
// import AllTasks from '../AllTasks/AllTasks';
// import CompletedTasks from '../CompletedTasks/CompletedTasks';
// import { deleteTask, getTasks, postTask, updateTask } from '../../Api/Api';
// import { formatDate, isArraysEqual } from '../../Utils/Utils';
// import {TaskType} from '../../Utils/Interfaces';
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../store/store';
// import { fetchTasks } from '../../store/features/tasksSlice';

// const App = () => {
//   // const [initialTasks, setInitialTasks] = useState<TaskType[]>([]);
//   // const [incompletedTasks, setIncompletedTasks] = useState<TaskType[]>([]);
//   // const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
//   // const [filteredResults, setFilteredRefult] = useState<TaskType[]>([]);
//   // const [filterOn, setFilterOn] = useState(false)
//   const [popupType, setPopupType] = useState<boolean | string>(false);
//   // const [tasksForToday, setTasksForToday] = useState<TaskType[]>([]);
//   const [popupContent, setPopupContent] = useState<TaskType | TaskType[] |undefined>();
//   const [filter, setFilter] = useState({tag:'', query:''});
//   // const [pathName, setPathName] = useState(useLocation().pathname);
  
//   ///
//   const showModal = () => {
//   }
//    const dispatch = useAppDispatch();
//    useEffect(() => {
//      dispatch(fetchTasks())
//    },[]);

//    const tasks = useAppSelector((state) => state.tasks);
   
   
//    useEffect(() => {
//     const lastVisit = window.localStorage.getItem('last-visit');
//     if( lastVisit && lastVisit !== formatDate(new Date())){
//       const tasksForToday = tasks.uncompleted.filter(task => task.date === lastVisit)
//       if(tasksForToday.length !== 0){
//         setPopupContent(tasksForToday)
//         setPopupType('modal');
        
//       }
//     } if (!lastVisit){
//       const tasksForToday = tasks.uncompleted.filter(task => task.date === formatDate(new Date()))
//       if(tasksForToday.length !== 0){
//         setPopupContent(tasksForToday)
//         setPopupType('modal');
        
//       }
//       console.log('set lastVisit')
//     }
//     // window.localStorage.setItem('last-visit', formatDate(new Date())); 

//   },[tasks]);
 
//   // const filterByTag = () => {
//   //   switch(pathName.replace('/','')){
//   //     case('home'):

//   //   }
//   // }

  
//    // EXPERIMENTAL!!!


//   //
//   // useEffect(() => {
//   //   let isMounted = true;
//   //   getTasks()
//   //   .then( res => {
//   //     if (isMounted){
//   //     // setInitialTasks(res)
//   //     const [completed, incompleted] = res.reduce((acc:Array<TaskType[]>, task:TaskType) => {
//   //       task.isCompleted ? acc[0].push(task) : acc[1].push(task);
//   //       return acc;
//   //     }, [[], []]);
//   //     setFilteredRefult(incompleted);
//   //     // setIncompletedTasks(incompleted);
//   //     setCompletedTasks(completed);
//   //     setTasksForToday(tasks.uncompleted.filter((task:TaskType) => task.date === formatDate(new Date())));

//   //     //
    
//   //     //
//   //     }
//   //   })
//   //   .catch(err => console.error(err.message));
//   //   return () => {
//   //     isMounted = false;
//   //   };
//   // }, [])

// // useEffect(() => {
// //     setCompletedTasks(initialTasks.filter((task:TaskType) => task.isCompleted));
// //   },[initialTasks])

// // useEffect(() => {
// //     setIncompletedTasks(initialTasks.filter((task:TaskType) => !task.isCompleted));
// //   },[initialTasks])

// // useEffect(()=> {
// //   console.log(tasksForToday, 'tasks for today')
// //     let isMounted = true;
// //     const lastVisit = window.localStorage.getItem('last-visit');
// //     console.log(isMounted,  lastVisit,  lastVisit !== formatDate(new Date()), "CONDITION")
// //       if(isMounted && lastVisit && lastVisit !== formatDate(new Date())){
// //         setPopupType('modal');
// //         window.localStorage.setItem('last-visit', formatDate(new Date()));
// //       }
// //     return () => {
// //       isMounted = false;
// //     };
// //   },[tasksForToday])

// // const addTaskHandler = useCallback((data:TaskType) => {
// //     postTask(data)
// //     .then(res => {
// //       setIncompletedTasks([...incompletedTasks, res])
// //       setPopupType(false)
// //     })
// //   }, [incompletedTasks])

// // const moveTaskHandler = useCallback((task: TaskType) => {
// //   const isTaskCompleted = task.isCompleted;
// //   const updatedIncompletedTasks = incompletedTasks.filter(
// //     (t) => t.id !== task.id
// //   );
// //   const updatedCompletedTasks = completedTasks.filter(
// //     (t) => t.id !== task.id
// //   );
// //   task.isCompleted = !isTaskCompleted;
// //   const updatedTask = { ...task };
// //   if (!isTaskCompleted) {
// //     updatedCompletedTasks.push(updatedTask);
// //   } else {
// //     updatedIncompletedTasks.push(updatedTask);
// //   }
// //   setIncompletedTasks(updatedIncompletedTasks);
// //   setCompletedTasks(updatedCompletedTasks);
// //   updateTask(updatedTask);
// // }, [incompletedTasks, completedTasks]);


// // const deleteHandler = useCallback((id:string) => {
// //     const tasksAfterDeletion:TaskType[] = incompletedTasks.filter((a:TaskType) => a.id!==id)
// //     setIncompletedTasks(tasksAfterDeletion)
// //     deleteTask(id)
// //   }, [incompletedTasks])
// ///
// // const editTaskHandler = useCallback((task:TaskType, id:string|undefined) => {
// //   updateTask(task)
// //   .then(res => {
// //     const updatedTasks = incompletedTasks.filter((t) => t.id !== id)
// //     updatedTasks.push(res); 
// //     setIncompletedTasks(updatedTasks)
// //     setPopupType(false)
// //   })
// //   .catch(err => console.error(err))
  
// // }, [incompletedTasks])

// /// add filter for tasks by query and by tags////



//   return (
//     <Routes>
//       <Route path="/tasks/*" element={
//       <>
//         <Header/>
//         <Nav
//           //pathName={pathName}
//           //setPathName={setPathName}
//           setFilter={setFilter}
//           setPopupType={setPopupType}
//         />
//         <AllTasks 
//           // deleteHandler={deleteHandler}
//           // filteredResults={filteredResults} 
//           // moveTaskHandler={moveTaskHandler}
//           // filterOn={filterOn}
//           filter={filter}
//           setPopupType={setPopupType}
//           setPopupContent={setPopupContent}

//         />
//         <CompletedTasks 
//           // moveTaskHandler={moveTaskHandler}
//           setPopupType={setPopupType}
//           setPopupContent={setPopupContent}
//         />
//         {popupType ? 
//           <Popup 
//             popupType={popupType}
//             popupContent={popupContent}
//             setPopupType={setPopupType} 
//             // tasksForToday={tasksForToday}
//             // editTaskHandler={editTaskHandler}
//           /> 
//         : null
//         }
//       </>
//       }/> 
//       <Route path="*" element={<Navigate to="/tasks" />} />
//     </Routes>
//   );
// }

// export default App;

