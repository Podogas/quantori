import { useSelector } from "react-redux";
import { TaskType, deleteHandlerType, taskHandlerType } from "../../Utils/Interfaces";
import TaskList from "../TaskList/TaskList";
import "./AllTasks.css";
const AllTasks = ({
  incompletedTasks,
  filterOn, 
  filteredResults,
  moveTaskHandler,
  deleteHandler,
  setPopupType,
  setPopupContent
}:{
  incompletedTasks:TaskType[],
  filterOn:boolean, 
  filteredResults:TaskType[],
  moveTaskHandler:taskHandlerType,
  deleteHandler:deleteHandlerType,
  setPopupType:(value: string | boolean) => void,
  setPopupContent: (value: TaskType)=> void
}) => {
  ///
  interface RootState {
    completed: TaskType[];
    uncompleted: TaskType[];
  }
  const reduxUncompletedTasks = useSelector((state:RootState) => state.uncompleted);
  console.log(reduxUncompletedTasks, 'All tasks')
  ///  
  if(incompletedTasks.length === 0){ 
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
          tasks={filterOn ? filteredResults : incompletedTasks} 
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
