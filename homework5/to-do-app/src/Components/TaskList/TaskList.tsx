import { useRef } from 'react';
import { TaskType, deleteHandlerType, moveTaskHandlerType } from '../../Utils/Interfaces';
import './TaskList.css';
const TaskList = ({
  tasks, 
  blockName, 
  moveTaskHandler, 
  deleteHandler
}:{
  tasks:TaskType[],
  blockName:string, 
  moveTaskHandler:moveTaskHandlerType, 
  deleteHandler:deleteHandlerType  
  }
) => {
    const deleteBtnRef = useRef<HTMLButtonElement>(null);
    const checkboxRef = useRef<(HTMLInputElement | undefined | null)[]>([]);
    
    const onDeleteClick = (id:string)=> {
      
      deleteHandler(id)
    }
    const moveTask = (task:TaskType) => {
      moveTaskHandler(task)
    }
    const createTasks = (task:TaskType) => {
      return (
        <div key={task.id} className={`${blockName}__task`}>
          <input 
            className={`${blockName}__task-checkbox`}
            type="checkbox"
            ref={(el) => 
              { if(task.id){
                const index:number = Number(task.id)
                checkboxRef.current[index] = el;
              }
               return el 
              }
            } 
            onClick={() => moveTask(task)}
          />
          <div className={`${blockName}__task-info-wrapper`}>
            <h4 className={`${blockName}__task-title`}>{task.title}</h4>
            <div className={`${blockName}__task-caption-wrapper`}>
              <span className={`${blockName}__task-tag ${blockName}__task-tag--${task.isCompleted ? 'completed': task.tag}`}>{task.tag}</span>
              <span className={`${blockName}__task-date`}>{task.date}</span>
            </div>
          </div>
          {task.isCompleted ? null : <button className={`${blockName}__task-button`} type="button" ref={deleteBtnRef} onClick={() => onDeleteClick(task.id??'')}></button>}            </div>
      );
    }

  return (<> {tasks.map((task:TaskType) => createTasks(task)) }</>)
}
export default TaskList;