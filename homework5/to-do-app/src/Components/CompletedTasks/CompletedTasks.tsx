import React from "react";
import { TaskType, taskHandlerType } from "../../Utils/Interfaces";
import TaskList from "../TaskList/TaskList";
import './CompletedTasks.css'
const CompletedTasks = ({
  completedTasks,
  moveTaskHandler,
  setPopupType,
  setPopupContent
}:{
  completedTasks:TaskType[],
  moveTaskHandler:taskHandlerType,
  setPopupType:(value: string | boolean) => void,
  setPopupContent: (value: TaskType)=> void 
}) => {
    if(completedTasks.length === 0){ 
        return null
    }
    return (
      <section className='completed-tasks'>
        <h3 className='completed-tasks__title'>Completed Tasks</h3>
        <TaskList 
          tasks={completedTasks} 
          blockName='completed-tasks' 
          moveTaskHandler={moveTaskHandler}
          deleteHandler={()=>{}}
          setPopupType={setPopupType}
          setPopupContent={setPopupContent}
        />
      </section>  
    );
}

export default React.memo(CompletedTasks);