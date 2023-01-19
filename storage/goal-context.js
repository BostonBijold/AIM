import { createContext, useReducer } from "react";


export const GoalContext = createContext({
  goals: [],
  setGoals: [], 
  addGoal: (title, willDescription, whyDescription, deadline) => {},
  deleteGoal: (id) => {},
  updateGoal: (
    id,
    { title, willDescription, whyDescription, deadline, isComplete, completedTasks, totalTasks }
  ) => {},
});

function goalReducer(state, action) {
  switch (action.type) {
    case 'SET': 
      const inverted = action.payload.reverse(); //reverses the order of the goals from latest enered to first entered. 
      // return inverted;
      return action.payload;
    case "ADD":
    
      //const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state];
      //return [{ ...action.payload, id: id }, ...state]; - updated by http connection 
    case "UPDATE":
      const updateableGoalIndex = state.findIndex(
        (goal) => goal.id === action.payload.id
      );
      const updateableGoal = state[updateableGoalIndex];
      const updatedItem = { ...updateableGoal, ...action.payload.data };

      updatedGoals = [...state];
      updatedGoals[updateableGoalIndex] = updatedItem;
      return updatedGoals;
    case "DELETE":
      return state.filter((goal) => goal.id !== action.payload);
    default:
      return state;
  }
}



function GoalContextProvider({ children }) {
  const [goalsState, dispatch] = useReducer(goalReducer, []);

  function setGoals(goals) {
    dispatch({type: 'SET', payload: goals});
  }

  function addGoal(goalData) {
    dispatch({ type: "ADD", payload: goalData });
  }

  function deleteGoal(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateGoal(id, goalData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: goalData } });
  }

  const value = {
    goals: goalsState,
    setGoals: setGoals,
    addGoal: addGoal,
    deleteGoal: deleteGoal,
    updateGoal: updateGoal,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export default GoalContextProvider;
