import { useContext } from "react";
import { Text, View } from "react-native";
import GoalsOutput from "../components/GoalsOutput";
import TaskItem from "../components/TaskItem";
import TasksOutput from "../components/TasksOutput";
import { GoalContext } from "../storage/goal-context";
import { TaskContext } from "../storage/Task-Context";
import TaskList from "../storage/TaskList";

// Daily focus or 'Focus' is where the user will focus their day. This is the personal daily standup for the user.
// The user can add new tasks and related them to active goals or select previously entered tasks to focus on.
// I envision this to help with 'Themes' - the metagoal for the goals. the deep reason the goal exists.

// I want a notes secion for review of the previous day or at the end of the day, a daily (or self timed) retrospective.
//

function DailyFocus() {
  const taskCtx = useContext(TaskContext);
  const activeTasks = taskCtx.tasks.filter((task) => {
    return task.isComplete === false;
  });

  return (
    
    // <View>
    //   <Text>Daily Focus: </Text>
    //   <Text>Enter task for the day or select previously entered task</Text>
    // </View>
    <TasksOutput tasks={activeTasks} /> 

  );
}

export default DailyFocus;
