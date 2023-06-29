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
import { fetchTasks, fetchFocus } from "../util/http";

// Daily focus or 'Focus' is where the user will focus their day. This is the personal daily standup for the user.
// The user can add new tasks and related them to active goals or select previously entered tasks to focus on.
// I envision this to help with 'Themes' - the metagoal for the goals. the deep reason the goal exists.

// I want a notes secion for review of the previous day or at the end of the day, a daily (or self timed) retrospective.
//


const newdummy = {
    id: 1,
    focusDate: new Date(),
    journal: "Memento Mori.",
    focusTasks: [],
    tasksCompleted: false, 
};

function DailyFocus({route}) {
  const focusCtx = useContext(FocusContext);
  // console.log(focusCtx.focus)
  // console.log('break')

  const taskCtx = useContext(TaskContext);
  const [error, setError] = useState();
  const [isfetching, setIsFetching] = useState(true); // set to true since inital page load will always need to load data.
// const focusId = 1
// day filter 

// Filter focus to grab the most recent? not a day search? 

const TDFocus = focusCtx.focus.filter((focus) => {
  const today = new Date(); // gets today's date
  const oneDay = getDateMinusDays(today, 1); // gets yesterday's date 
  return focus.focusDate > oneDay;
  // update to pull first focus - ensure only today's date is the loaded focus. 
  //todaysfocus update to todaysFocus[0] - extract here not below
});
//console.log(focusCtx.focus)
let todaysFocus 
if (TDFocus[0] !== new Date()) {
  todaysFocus = newdummy;
} else{
todaysFocus = TDFocus;
}

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
      try {
        const focusLoad = await fetchFocus();
        if(focusLoad[0].focusDate !== new Date()) {
          focusLoad.unshift(newdummy) // if the first focus is not todays date pushes dummy data to the first of the array and stores. 
        }
        focusCtx.setFocus(focusLoad);
      } catch (error) {
        setError("Could not fetch Focus");
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
  
  // const activeTasks = taskCtx.tasks.filter((task) => {
  //   return task.isComplete === false;
  // });

  // const focusdata = focusCtx.focus;
  // return <TasksOutput tasks={activeTasks} />;

  //pulls the first Focus- today's foucus. 
  // if focus doesn't exist create one. 
  //const TDFocus = todaysFocus[0]; 
  const focusId = TDFocus.id;
  const today = new Date();

  // if (focusId.focusDate != today) {
  //   //focustest = newdummy
  //   return <FocusOutput defaultValues={newdummy} focusId={4} />;

  // };


  return <FocusOutput defaultValues={todaysFocus} focusId={focusId} />;
}

export default DailyFocus;

