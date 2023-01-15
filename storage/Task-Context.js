import { createContext, useReducer } from "react";

const DUMMY_TASKS = [
  {
    id: "t1",
    goalId: "g1",
    description: "Learn React Native.",
    isComplete: false,
  },
  {
    id: "t2",
    goalId: "g1",
    description: "Learn source control in bitbucket.",
    isComplete: false,
  },
  {
    id: "t3",
    goalId: "g1",
    description: "Add a focus screen.",
    isComplete: true,
  },
  {
    id: "t4",
    goalId: "g2",
    description: "Plan a pant-less weekend.",
    isComplete: false,
  },
];

 //update
export const TaskContext = createContext({
  tasks: [],
  addTask: ( goalId, description) => {},
  deleteTask: (id) => {},
  updateTask: (
    id,
    { goalId, description, isComplete }
  ) => {},
});

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
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
  const [tasksState, dispatch] = useReducer(taskReducer, DUMMY_TASKS);

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
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
