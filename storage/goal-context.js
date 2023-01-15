import { createContext, useReducer } from "react";

const DUMMY_GOALS = [
  {
    id: "g1",
    title: "Goal App",
    willDescription: "create a goal tracking app",
    whyDescription: "I can track my goals, learn Agile, and React.",
    deadline: new Date("2024-01-01"),
    isComplete: false,
    //createdAt: new Date("2023-01-07"),
  },
  {
    id: "g2",
    title: "Potty Training",
    willDescription: "potty train Harrison",
    whyDescription: "we can stop spending money on diapers.",
    deadline: new Date("2023-07-01"),
    isComplete: false,
    //createdAt: new Date("2023-01-07"),
  },
  {
    id: "g3",
    title: "Gym Habit",
    willDescription: "make going to the gym a habit",
    whyDescription: "I can be more physically fit and practice discipline.",
    deadline: new Date("2023-01-01"),
    isComplete: true,
    //createdAt: new Date("2022-01-01"),
  },
  {
    id: "g4",
    title: "5 Lbs",
    willDescription: "gain 5 pounds of muscle",
    whyDescription: "I have a better physique and a stonger body.",
    deadline: new Date("2024-01-01"),
    isComplete: false,
    //createdAt: new Date("2023-01-07"),
  },
];

export const GoalContext = createContext({
  goals: [],
  addGoal: (title, willDescription, whyDescription, deadline) => {},
  deleteGoal: (id) => {},
  updateGoal: (
    id,
    { title, willDescription, whyDescription, deadline, isComplete }
  ) => {},
});

function goalReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [goalsState, dispatch] = useReducer(goalReducer, DUMMY_GOALS);

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
    addGoal: addGoal,
    deleteGoal: deleteGoal,
    updateGoal: updateGoal,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export default GoalContextProvider;
