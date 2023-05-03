import { TaskType, deleteHandlerType, moveTaskHandlerType } from "../../Utils/Interfaces";
import TaskList from "../TaskList/TaskList";
import "./AllTasks.css";
const AllTasks = ({
  incompletedTasks,
  filterOn, 
  filteredResults,
  moveTaskHandler,
  deleteHandler
}:{
  incompletedTasks:TaskType[],
  filterOn:boolean, 
  filteredResults:TaskType[],
  moveTaskHandler:moveTaskHandlerType,
  deleteHandler:deleteHandlerType  
}) => {
  // if (filterOn) {
  //   return (
  //     <section className='all-tasks'>
  //       <h3 className='all-tasks__title'>All Tasks</h3>
  //       <TaskList 
  //         tasks={filteredResults} 
  //         blockName='all-tasks' 
  //         moveTaskHandler={moveTaskHandler}
  //         deleteHandler={deleteHandler}
  //       />
  //     </section>  
  //   );
  // } else {
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
        />
      </section>  
    );
  // }       
}

export default AllTasks;
