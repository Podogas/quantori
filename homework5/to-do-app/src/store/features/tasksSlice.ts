import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../../Utils/Interfaces";
import { dbUrl } from "../../Utils/env";

interface TasksState {
  completed: TaskType[],
  uncompleted: TaskType[]
}
const initialState: TasksState = {
  completed:[],
  uncompleted:[]
};

const fetchTasks = createAsyncThunk(
  "tasks/get",
  async () => {
    const response = await fetch(`${dbUrl}/tasks`, {
      method: "GET",
    })
    const res = response.json();
    return res;
  },
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTasksList: (state, action) => {
      state.completed = action.payload.completed;
      state.uncompleted = action.payload.uncompleted;
    },
    addUncompletedTask: (state, action: PayloadAction<TaskType>) => {
      state.uncompleted.push(action.payload);
    },
    removeUncompletedTask: (state, action: PayloadAction<string>) => {
      state.uncompleted = state.uncompleted.filter(t => t.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<TaskType>) => {
      state.uncompleted = state.uncompleted.map(t => t.id !== action.payload.id ? t : action.payload);
    },
    moveTasks: (state, action: PayloadAction<TaskType>) => {
        const updatedTask = action.payload;
        let updatedUncompleted = state.uncompleted;
        let updatedCompleted = state.completed;
        const index = state.uncompleted.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
            updatedUncompleted = updatedUncompleted.splice(index, 1);
            updatedCompleted.push(updatedTask)
          } else {
            const index = state.completed.findIndex((t) => t.id === updatedTask.id);
            updatedCompleted = updatedCompleted.splice(index, 1);
            updatedUncompleted.push(updatedTask);
          }
          state = {completed:updatedCompleted, uncompleted:updatedUncompleted}
    },  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
        const [completed, uncompleted] = action.payload.reduce((acc:Array<TaskType[]>, task:TaskType) => {
            task.isCompleted ? acc[0].push(task) : acc[1].push(task);
            return acc;
          }, [[], []]);
      state.completed = completed;
      state.uncompleted = uncompleted;
    });
  },
});
const { addUncompletedTask, removeUncompletedTask, moveTasks, editTask, updateTasksList} = taskSlice.actions;

export {fetchTasks, taskSlice, addUncompletedTask, removeUncompletedTask, moveTasks, editTask, updateTasksList}