import { TaskType } from "../../Utils/Interfaces";
import { TaskList } from "../TaskList/TaskList";
import "./CompletedTasks.css";
import { useAppSelector } from "../../store/store";
const CompletedTasks = ({
  setPopupType,
  setPopupContent,
}: {
  setPopupType: (value: string | boolean) => void;
  setPopupContent: (value: TaskType) => void;
}) => {
  const completedTasks = useAppSelector((state) => state.tasks.completed);

  if (completedTasks.length === 0) {
    return null;
  }
  return (
    <section className="completed-tasks">
      <h3 className="completed-tasks__title">Completed Tasks</h3>
      <TaskList
        tasks={completedTasks}
        blockName="completed-tasks"
        setPopupType={setPopupType}
        setPopupContent={setPopupContent}
      />
    </section>
  );
};

export { CompletedTasks };
