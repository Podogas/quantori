import TaskList from "../TaskList/TaskList";
import "./AllTasks.css";
const AllTasks = ({
  incompletedTasks,
  filterOn, 
  filteredResults,
  moveTaskHandler,
  deleteHandler
}) => {
  if (filterOn) {
    return (
      <section className='all-tasks'>
        <h3 className='all-tasks__title'>All Tasks</h3>
        <TaskList 
          tasks={filteredResults} 
          blockName='all-tasks' 
          moveTaskHandler={moveTaskHandler}
        />
      </section>  
    );
  } else {
    return (
      <section className='all-tasks'>
        <h3 className='all-tasks__title'>All Tasks</h3>
        <TaskList 
          tasks={incompletedTasks} 
          blockName='all-tasks' 
          moveTaskHandler={moveTaskHandler} 
          deleteHandler={deleteHandler}
        />
      </section>  
    );
  }       
}

export default AllTasks;
