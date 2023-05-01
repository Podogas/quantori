import React,{ RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { TaskType, TasksType } from '../../Utils/Interfaces';
import './TaskList.css';
const TaskList = ({
  tasks, 
  blockName, 
  moveTaskHandler, 
  deleteHandler
}) => {
    const deleteBtnRef = useRef();
    const checkboxRef = useRef([]);
    
    const onDeleteClick = (id)=> {
      const dataToPush = tasks.filter((a) => a.id!==id)
      deleteHandler(dataToPush, id)
    }
    const moveTask = (task, el) => {
      moveTaskHandler(task, el)
    }
    const createTasks = (task) => {
      return (
        <div key={task.id} className={`${blockName}__task`}>
          <input 
            className={`${blockName}__task-checkbox`}
            type="checkbox" 
            ref={(el) => 
              {checkboxRef.current[task.id] = el;
               return el 
              }
            } 
            onClick={() => moveTask(task, checkboxRef.current[task.id])}
          />
          <div className={`${blockName}__task-info-wrapper`}>
            <h4 className={`${blockName}__task-title`}>{task.title}</h4>
            <div className={`${blockName}__task-caption-wrapper`}>
              <span className={`${blockName}__task-tag ${blockName}__task-tag--${task.isCompleted ? 'completed': task.tag}`}>{task.tag}</span>
              <span className={`${blockName}__task-date`}>{task.date}</span>
            </div>
          </div>
          {task.isCompleted ? null : <button className={`${blockName}__task-button`} type="button" ref={deleteBtnRef} onClick={() => onDeleteClick(task.id)}></button>}            </div>
      );
    }

  return tasks.map((task) => createTasks(task))
}
export default TaskList;