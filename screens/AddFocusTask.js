import { useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import FocusOutput from "../components/FocusOutput";
import TasksOutput from "../components/TasksOutput";
import { FocusContext } from "../storage/Focus-Context";
import FocusTaskList from "../storage/FocusTasksList";
import { TaskContext } from "../storage/Task-Context";

// needs to display the all incomplete tasks for selection.

function AddFocusTask({ route, navigation }) {
  const focusId = "123";
  const taskCtx = useContext(TaskContext);
  const focusCtx = useContext(FocusContext);
  const focus = focusCtx.focus[0]; // ensure the first focus is always today's focus

  const activeTasks = taskCtx.tasks.filter((task) => {
    // check if task is not complete && if task is not in focus tasks.
    return task.isComplete === false;
  });

// ++++++++++++++++ update filter to match stored id, not stored task. +++++++++++++++++++
  const nonFocusTasks = activeTasks.filter(
    (task) => !focus.focusTasks.some((focusTaskId) => focusTaskId === task.id)
  );
  // focusTaskID is the stored id array in focus.focusTasks. array is compared to Id of task array 
  // filters the tasks that are not complete against those in the focus and only shows those that are not in the focus to be added. 
  //   return <TasksOutput tasks={activeTasks} focusId={route.params} />;
  return <FocusTaskList tasks={nonFocusTasks} focusId={route.params} />;
}

export default AddFocusTask;
