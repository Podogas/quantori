
import { TaskType, deleteHandlerType, taskHandlerType } from "../../Utils/Interfaces";
import { useAppSelector } from "../../store/store";
import TaskList from "../TaskList/TaskList";
import "./AllTasks.css";
const AllTasks = ({
  filterOn, 
  filteredResults,
  moveTaskHandler,
  deleteHandler,
  setPopupType,
  setPopupContent
}:{
  filterOn:boolean, 
  filteredResults:TaskType[],
  moveTaskHandler:taskHandlerType,
  deleteHandler:deleteHandlerType,
  setPopupType:(value: string | boolean) => void,
  setPopupContent: (value: TaskType)=> void
}) => {
  const uncompletedTasks = useAppSelector((state) => state.tasks.uncompleted);
  console.log(uncompletedTasks, "SELECTOR ALLTASKS")
  ///
  interface RootState {
    completed: TaskType[];
    uncompleted: TaskType[];
  }

  if(uncompletedTasks.length === 0){ 
      return null
    }
    if(filterOn && filteredResults.length === 0){
      return <section className='all-tasks'>
      <h3 className='all-tasks__title--no-results'>No results</h3>
    </section>  
    }
    return (
      <section className='all-tasks'>
        <h3 className='all-tasks__title'>All Tasks</h3>
        <TaskList 
          tasks={filterOn ? filteredResults : uncompletedTasks} 
          blockName='all-tasks' 
          moveTaskHandler={moveTaskHandler} 
          deleteHandler={deleteHandler}
          setPopupType={setPopupType}
          setPopupContent={setPopupContent}
        />
      </section>  
    );      
}

export default AllTasks;
