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

export const fetchTasks = createAsyncThunk(
  "tasks/get",
  async (thunkAPI) => {
    const response = await fetch(`${dbUrl}/tasks`, {
      method: "GET",
    });
    const res = response.json();
    return res;
  },
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addUncompletedTask: (state, action: PayloadAction<TaskType>) => {
        console.log('catch add task', action.payload)
      state.uncompleted.push(action.payload);
    },
    removeUncompletedTask: (state, action: PayloadAction<string>) => {
        console.log('catch delete task', action.payload)
      state.uncompleted = state.uncompleted.filter(t => t.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<TaskType>) => {
        console.log('catch edit task', action.payload)

      state.uncompleted = state.uncompleted.map(t => t.id !== action.payload.id ? t : action.payload);
    },
    moveTasks: (state, action: PayloadAction<TaskType>) => {
        console.log('catch update task', action.payload)
        const updatedTask = action.payload;
        let updatedUncompleted = state.uncompleted;
        let updatedCompleted = state.completed;
        const index = state.uncompleted.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
            updatedUncompleted = updatedUncompleted.splice(index, 1);
            updatedCompleted.push(updatedTask)
          } else {
            const index = state.completed.findIndex((t) => t.id === updatedTask.id);
            console.log('ITS COMPLETED',  updatedCompleted.filter(t=> t.id !== updatedTask.id ))
            updatedCompleted = updatedCompleted.splice(index, 1);
            updatedUncompleted.push(updatedTask);
            console.log(updatedCompleted, 'AFTER')
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

export default taskSlice.reducer;
export const { addUncompletedTask, removeUncompletedTask, moveTasks, editTask } = taskSlice.actions;


