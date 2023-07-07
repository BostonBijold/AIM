import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import TaskForm from "../components/ManageEntries/TaskForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { GoalContext } from "../storage/goal-context";
import { TaskContext } from "../storage/Task-Context";
import { removeTask, storeTask, updateGoal, updateTask } from "../util/http";

function ManageTask({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  let goal = "";
  if (route.params?.goal) {
    goal = route.params.goal;
  } else {
    goal = route.params;
  }
  const taskCtx = useContext(TaskContext);
  const goalsCtx = useContext(GoalContext);
  

  const editedTaskId = route.params?.taskId;
  const isEditing = !!editedTaskId;

  const selectedTask = taskCtx.tasks.find((task) => task.id === editedTaskId);
  // const goal = goalsCtx.goals.find((goal) => goal.id === selectedTask.goalId);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteTask() {
    setIsSubmitting(true);
    if (selectedTask.isComplete) {
      try {
        await removeTask(editedTaskId);
        taskCtx.deleteTask(editedTaskId);
        goal.totalTasks = goal.totalTasks - 1;
        goal.completedTasks = goal.completedTasks - 1;
        await updateGoal(goal.id, goal);
        goalsCtx.updateGoal(goal.id, goal);
        navigation.goBack();
      } catch {
        setError("Could not save data - please try again later. ");
        setIsSubmitting(false);
      }
    } else {
      try {
        await removeTask(editedTaskId);
        taskCtx.deleteTask(editedTaskId);
        goal.totalTasks = goal.totalTasks - 1;
        await updateGoal(goal.id, goal);
        goalsCtx.updateGoal(goal.id, goal);
        navigation.goBack();
      } catch {
        setError("Could not save data - please try again later. ");
        setIsSubmitting(false);
      }
    }
  }

  async function completeHandler() {
    setIsSubmitting(true);
    if (selectedTask.isComplete) {
      selectedTask.isComplete = false;
      goal.completedTasks = goal.completedTasks - 1;
    } else {
      selectedTask.isComplete = true;
      goal.completedTasks = goal.completedTasks + 1;
    }
    try {
      await updateTask(editedTaskId, selectedTask);
      taskCtx.updateTask(editedTaskId, selectedTask);
      await updateGoal(goal.id, goal);
      goalsCtx.updateGoal(goal.id, goal);
      navigation.goBack();
    } catch {
      setError("Could not save data - please try again later. ");
      setIsSubmitting(false);
    }
  }

  async function confirmHandler(taskData) {
    if (isEditing) {
      setIsSubmitting(true);
      try {
        await updateTask(editedTaskId, taskData);
        taskCtx.updateTask(editedTaskId, taskData);
        navigation.goBack();
      } catch {
        setError("Could not save data - please try again later. ");
        setIsSubmitting(false);
      }
    } else {
      try {
        const id = await storeTask(taskData); // are we using the id from stored tasks?
        taskData.id = id;
        taskCtx.addTask(taskData);
        const goalupdated = goalsCtx.goals.find(
          (goal) => goal.id === taskData.goalId
        );
        const updatedGoalTotal = {
          title: goalupdated.title,
          willDescription: goalupdated.willDescription,
          whyDescription: goalupdated.whyDescription,
          deadline: goalupdated.deadline,
          isComplete: goalupdated.isComplete,
          completedTasks: goalupdated.completedTasks,
          totalTasks: goalupdated.totalTasks + 1,
        };
        await updateGoal(taskData.goalId, updatedGoalTotal);
        goalsCtx.updateGoal(taskData.goalId, updatedGoalTotal);
        navigation.goBack();
      } catch {
        setError("Could not save data - please try again later. ");
      }
    }
  }

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.completeCancel}>
          <IconButton
            icon={"trash"}
            size={50}
            color={GlobalStyles.colors.dark1}
            onPress={deleteTask}
          />
          <View style={styles.statusContainer}>
            <Text>Status</Text>
            {!selectedTask.isComplete && (
              // <IconButton
              //   icon={"checkbox"}
              //   size={50}
              //   color={GlobalStyles.colors.dark1}
              //   onPress={completeHandler}
              // />
              <Button style={styles.button} onPress={completeHandler}>
                Active
              </Button>
            )}
            {selectedTask.isComplete && (
              // <IconButton
              //   icon={"close"}
              //   size={50}
              //   color={GlobalStyles.colors.dark1}
              //   onPress={completeHandler}
              // />
              <Button style={styles.button} onPress={completeHandler}>
                Completed
              </Button>
            )}
          </View>
        </View>
      )}
      <Text>{goal.title}</Text>
      <TaskForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLable={isEditing ? "Update" : "Add"}
        defaultValues={selectedTask}
        goal_Id={goal.id}
        goalTitle={goal.title}
      />
    </View>
  );
}

export default ManageTask;

//set the page title as 'add task' or task title.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  statusContainer: {
    alignItems: 'center'
  },
  completeCancel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    borderColor: GlobalStyles.colors.layer1,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: GlobalStyles.colors.layer1light,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 8,
  },
});

//set the title of the goal as the title on the card or 'add goal'.
// trash and complete goal icons need to be at the top of the form .
