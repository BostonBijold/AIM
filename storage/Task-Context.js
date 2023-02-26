import { createContext, useReducer } from "react";

export const TaskContext = createContext({
  tasks: [],
  setTasks: [],
  addTask: ( goalId, description) => {},// add goal title to task update 
  deleteTask: (id) => {},
  updateTask: (
    id,
    { goalId, goalTitle, description, isComplete } 
  ) => {},
});

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET': 
    //const inverted = action.payload.reverse(); 
    // return inverted;
    return action.payload;
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      // not using task Id from firebase update -----------------------------------------
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updateableTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      const updateableTask = state[updateableTaskIndex];
      const updatedItem = { ...updateableTask, ...action.payload.data };
      updatedTasks = [...state];
      updatedTasks[updateableTaskIndex] = updatedItem;
      return updatedTasks;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function TaskContextProvider({ children }) {
  const [tasksState, dispatch] = useReducer(taskReducer, []);

  function setTasks(tasks) {
    dispatch({type: 'SET', payload: tasks});
  }

  function addTask(taskData) {
    dispatch({ type: "ADD", payload: taskData });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateTask(id, taskData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: taskData } });
  }

  const value = {
    tasks: tasksState,
    setTasks: setTasks,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
