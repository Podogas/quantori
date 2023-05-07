
// work with types

interface Task {
    id: number;
    description: string;
  }
  
  interface State {
    completed: Task[];
    uncompleted: Task[];
  }
  
  const initialState: State = {
    completed: [],
    uncompleted: []
  };
  
  type Action =
    | { type: 'change_both'; completed: Task[]; uncompleted: Task[] }
    | { type: 'change_completed'; completed: Task[] }
    | { type: 'change_uncompleted'; uncompleted: Task[] };
  
  const tasksReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
      case 'change_both': {
        console.log('change_both')
        return {
          completed: action.completed,
          uncompleted: action.uncompleted
        };
      }
      case 'change_completed': {
        console.log('change_completed')
        return {
          ...state,
          completed: action.completed
        };
      }
      case 'change_uncompleted': {
        console.log('change_uncompleted')
        return {
          ...state,
          uncompleted: action.uncompleted
        };
      }
      default:
        return state;
    }
  };
export default tasksReducer;