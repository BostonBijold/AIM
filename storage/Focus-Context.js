import { createContext, useReducer } from "react";


const DUMMY = [
  {
    id: 124,
    focusDate: new Date("2023-03-06"),
    journal: "journal string stored 2.",
    focusTasks: [ '-NMxyjJAAy-HomIY_Wja', '-NMy1_kFU-KXATdgT28H'
      // {
      //   id: 123,
      //   description: "add focus",
      //   goalId: "-NMxhIdw8zh4-YlkDkmB",
      //   goalTitle: "Remove embed",
      //   isComplete: true,
      // },
      // {
      //   id: 124,
      //   description: "add focus tasks",
      //   goalId: "-NMxhIdw8zh4-YlkDkmB",
      //   goalTitle: "Remove embed",
      //   isComplete: true,
      // },
    ],
    tasksCompleted: false,
  },
  {
    id: 125,
    focusDate: new Date("2023-02-03"),
    journal: "journal string stored.",
    focusTasks: ['-NMxyjJAAy-HomIY_Wja', '-NMy1_kFU-KXATdgT28H'],
    tasksCompleted: false,
  },
];

export const FocusContext = createContext({
  focus: [],
  setFocus: [],
  addFocus: (journal, focusDate, focusTasks) => {},
  updateFocus: (id, { journal, focusDate, focusTasks, tasksCompleted }) => {},
});

function focusReducer(state, action) {
  
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "UPDATE":
      const updateableFocusIndex = state.findIndex(
        (focus) => focus.date === action.payload.date
      );
      const updateableFocus = state[updateableFocusIndex];
      const updatedItem = { ...updateableFocus, ...action.payload.data };
      updatedFocus = [...state];
      updatedFocus[updateableFocusIndex] = updatedItem;
      return updatedFocus;
    default:
      return state;
  }
}

function FocusContextProvider({ children }) {
  const [focusState, dispatch] = useReducer(focusReducer, []);

  function setFocus(focus) {
    dispatch({ type: "SET", payload: focus });
  }

  function addFocus(focusData) {
    dispatch({ type: "ADD", payload: focusData });
  }

  function updateFocus(date, focusData) {
    dispatch({ type: "UPDATE", payload: { date: date, data: focusData } });
  }

  const value = {
    focus: focusState,
    setFocus: setFocus,
    addFocus: addFocus,
    updateFocus: updateFocus,
  };

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
}

export default FocusContextProvider;
