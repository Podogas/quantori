import TaskList from "../TaskList/TaskList";
import './CompletedTasks.css'
const CompletedTasks = ({
  completedTasks,
  moveTaskHandler
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
        />
      </section>  
    );
}

export default CompletedTasks;