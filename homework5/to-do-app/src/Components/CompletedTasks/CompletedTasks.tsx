import React from "react";
import { TaskType, moveTaskHandlerType } from "../../Utils/Interfaces";
import TaskList from "../TaskList/TaskList";
import './CompletedTasks.css'
const CompletedTasks = ({
  completedTasks,
  moveTaskHandler
}:{
  completedTasks:TaskType[],
  moveTaskHandler:moveTaskHandlerType  
}) => {
  console.log('Completed tasks rerendered')
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
        />
      </section>  
    );
}

export default React.memo(CompletedTasks);