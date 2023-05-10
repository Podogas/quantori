
import { useEffect, useState } from "react";
import { TaskType } from "../../Utils/Interfaces";
import { useAppSelector } from "../../store/store";
import {TaskList} from "../TaskList/TaskList";
import "./AllTasks.css";
const AllTasks = ({
  filter,
  setPopupType,
  setPopupContent
}:{
  filter:{tag:string, query:string},
  setPopupType:(value: string | boolean) => void,
  setPopupContent: (value: TaskType)=> void
}) => {

  const uncompletedTasks = useAppSelector((state) => state.tasks.uncompleted);
  const [filteredTasks, setFilteredTasks] = useState<undefined | TaskType[]>(undefined);
  
  useEffect(()=> {
    const tag = filter.tag;
    const query = filter.query;
    
    if(tag === '' && query === ''){
    setFilteredTasks(undefined);
    } else {
      let filtered = uncompletedTasks;
        if(tag !== ''){
        filtered = filtered.filter(task => task.tag === tag);
        }
        if(query !== ''){
        filtered = filtered.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
        }
        setFilteredTasks(filtered);
      }
  },[filter, uncompletedTasks])

  if(uncompletedTasks.length === 0){ 
    return null
  }
  if(filteredTasks && filteredTasks.length ===0){
    return (
      <section className='all-tasks'>
        <h3 className='all-tasks__title--no-results'>No results</h3>
      </section> 
    )
  }   
  return (
    <section className='all-tasks'>
      <h3 className='all-tasks__title'>All Tasks</h3>
      <TaskList 
        tasks={filteredTasks ? filteredTasks : uncompletedTasks} 
        blockName='all-tasks' 
        // moveTaskHandler={moveTaskHandler} 
        // deleteHandler={deleteHandler}
        setPopupType={setPopupType}
        setPopupContent={setPopupContent}
      />
    </section>  
  );      
}

export {AllTasks};
