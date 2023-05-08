import { useRef } from 'react';
import { TaskType, deleteHandlerType, taskHandlerType } from '../../Utils/Interfaces';
import './TaskList.css';
import { deleteTask, updateTask } from '../../Api/Api';
import { useAppDispatch } from '../../store/store';
import { removeUncompletedTask, moveTasks } from '../../store/features/tasksSlice';
const TaskList = ({
  tasks, 
  blockName, 
  moveTaskHandler, 
  deleteHandler,
  setPopupType,
  setPopupContent
}:{
  tasks:TaskType[],
  blockName:string, 
  moveTaskHandler:taskHandlerType, 
  deleteHandler:deleteHandlerType ,
  setPopupType:(value: string | boolean) => void,
  setPopupContent: (value: TaskType)=> void
  }
) => {
    const deleteBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);
    const checkboxRef = useRef<(HTMLInputElement | undefined | null)[]>([]);
    //

    const dispatch = useAppDispatch();
    const onDeleteClick = (id:string)=> {
      // deleteHandler(id)
      deleteTask(id)
      .then( res => {
          dispatch(removeUncompletedTask(id))
      })
      .catch(err => console.error(err))
    }
    const moveTask = (task:TaskType) => {
      //moveTaskHandler(task)
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      updateTask(updatedTask)
      .then(res => {
        dispatch(moveTasks(res))
      })
      .catch(err => console.error(err))
    }
    const onEditClick = (task:TaskType) => {
      setPopupContent(task);
      setPopupType('edit')
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
          {task.isCompleted ? null : 
          <div className={`${blockName}__task-buttons-wrapper`}>
          <button className={`${blockName}__task-button ${blockName}__task-edit-button`} type="button" ref={editBtnRef} onClick={() => onEditClick(task)}></button>
          <button className={`${blockName}__task-button ${blockName}__task-delete-button`} type="button" ref={deleteBtnRef} onClick={() => onDeleteClick(task.id??'')}></button>    
          </div>}     
        </div>
      );
    }

  return (<> {tasks.map((task:TaskType) => createTasks(task)) }</>)
}
export default TaskList;