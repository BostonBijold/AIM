import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FocusOutput from "../components/FocusOutput";
import GoalsOutput from "../components/GoalsOutput";
import TaskItem from "../components/TaskItem";
import TasksOutput from "../components/TasksOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { FocusContext } from "../storage/Focus-Context";
import { GoalContext } from "../storage/goal-context";
import { TaskContext } from "../storage/Task-Context";
import TaskList from "../storage/TaskList";
import { getDateMinusDays } from "../util/date";
import { fetchTasks, fetchFocus, storeFocus, updateFocus } from "../util/http";

// Daily focus or 'Focus' is where the user will focus their day. This is the personal daily standup for the user.
// The user can add new tasks and related them to active goals or select previously entered tasks to focus on.
// I envision this to help with 'Themes' - the metagoal for the goals. the deep reason the goal exists.

// I want a notes secion for review of the previous day or at the end of the day, a daily (or self timed) retrospective.
//

const newID = {
  focusDate: new Date(), // date not created to remove time stamp. 

}

const newdummy = {
    id: 1,
    focusDate: new Date(), // date not created to remove time stamp. 
    journal: " ",
    focusTasks: [],
    tasksCompleted: false, 
};

function DailyFocus({route}) {
  const focusCtx = useContext(FocusContext);

  const taskCtx = useContext(TaskContext);
  const [error, setError] = useState();
  const [isfetching, setIsFetching] = useState(true); // set to true since inital page load will always need to load data.

   

const TDFocus = focusCtx.focus.filter((focus) => {
  const today = new Date(); // gets today's date
  const oneDay = getDateMinusDays(today, 1); // gets yesterday's date 
  return focus.focusDate > oneDay;

});
// console.log(todaysFocus)


// end 


  useEffect(() => {
    async function getTasks() {
      setIsFetching(true);
      try {
        const taskLoad = await fetchTasks();
        //error is in taskCtx 
        taskCtx.setTasks(taskLoad);
      } catch (error) {
        setError("Could not fetch goals.");
      }
      setIsFetching(false);
    }
    async function getFocus() {
      console.log(focusCtx.focus)
      if (focusCtx.focus.length === 0 ) {
        
    try {
      const focusLoad = await fetchFocus();
      console.log('load focus')
      const TDFocus2 = focusLoad.filter((focus) => {
        const today = new Date(); // gets today's date
        const oneDay = getDateMinusDays(today, 1); // gets yesterday's date 
        return focus.focusDate > oneDay;
      }); 
      if(TDFocus2.length === 0) { // with matching date, this is skipped. 
        // try doesn't run after first load- refresh uses memory. 
        try {
          const newId = await storeFocus(newID);
          // console.log(id) // returns 855? Why? 
              newdummy.id = newId; //adds new ID from DB to newdummy 
              newdummy.journal = 'updated?'
              focusLoad.push(newdummy) // pushes newdummy to focusload for adding to context. 
              todaysFocus = newdummy; // sets todaysfocus upon creation. 
                console.log('TDF - 1')            
            } catch {
              console.log("error");
            }
          }
          
          focusCtx.setFocus(focusLoad);
        } catch (error) {
          setError("Could not fetch Focus");
        }
      }
    }
      getTasks();
      getFocus();
    }, []);
    function errorHandler() {
    setError(null);
    
// attempt to reload data upon confirm being pressed. 
  }
  if (error && !isfetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/> 
  }

  if (isfetching) {
    return <LoadingOverlay />;
  }
  
let todaysFocus 
todaysFocus = TDFocus[0];
if (TDFocus.length === 0 ) {
  todaysFocus = newdummy; // sets to dummy but updates upon id creation. 
  console.log('TDF - 3')            
  // still loads dummy first
} else{
  todaysFocus = TDFocus[0];
  console.log('TDF - 2')            

}
  const focusId = todaysFocus.id;
console.log(todaysFocus)
  return <FocusOutput defaultValues={todaysFocus} focusId={focusId} />;
}

export default DailyFocus;

