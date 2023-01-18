import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import GoalsForm from "../components/ManageEntries/GoalsForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { GoalContext } from "../storage/goal-context";
import { getFormatedDate } from "../util/date";
import TasksOutput from "../components/TasksOutput";
import { TaskContext } from "../storage/Task-Context";
import { NavigationHelpersContext } from "@react-navigation/native";

function GoalDetails({ route, navigation }) {
  const goalsCtx = useContext(GoalContext);
  const editedGoalId = route.params?.goalId;
  const isEditing = !!editedGoalId;
  const selectedGoal = goalsCtx.goals.find((goal) => goal.id === editedGoalId);

  //Task filter
  const taskCtx = useContext(TaskContext);
  const goalTasks = taskCtx.tasks.filter((task) => {
    return task.goalId === editedGoalId;
  });

  // const editedTaskId = route.params?.goalId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedGoal.title,
    });
  }, [navigation, isEditing]);

  //if complete - conditional change to show different icon for complete.

  function deleteGoalHandler() {
    goalsCtx.deleteGoal(editedGoalId);
    navigation.goback();
  }

  function completeGoalHandler() {
    if (selectedGoal.isComplete) {
      const goalData = {
        title: selectedGoal.title,
        willDescription: selectedGoal.willDescription,
        whyDescription: selectedGoal.whyDescription,
        deadline: new Date(selectedGoal.deadline),
        isComplete: false,
      };

      goalsCtx.updateGoal(selectedGoal.id, goalData);
    } else {
      const goalData = {
        title: selectedGoal.title,
        willDescription: selectedGoal.willDescription,
        whyDescription: selectedGoal.whyDescription,
        deadline: new Date(selectedGoal.deadline),
        isComplete: true,
      };

      goalsCtx.updateGoal(selectedGoal.id, goalData);
    }
  }

  function editGoalHandler() {
    navigation.navigate("Manage Goal", { goalId: selectedGoal.id });
    // Use goal id to open manage goal screen
  }

  function confirmHandler(goalData) {
    if (isEditing) {
      goalsCtx.updateGoal(editedGoalId, goalData);
    } else {
      goalsCtx.addGoal(goalData);
    }
    navigation.goBack();
  }

  function addTaskHandler() {}

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.titleContainer}>
        <IconButton
          icon={"create-outline"}
          size={40}
          color={GlobalStyles.colors.dark1}
          onPress={editGoalHandler}
          //title={'Edit'}
        />
        <Text style={styles.titles}>{selectedGoal.title}</Text>
        {selectedGoal.isComplete && (
          <IconButton
          icon={"checkbox"}
          size={40}
          color={GlobalStyles.colors.dark1}
          onPress={completeGoalHandler}
          />
        )}
        {selectedGoal.isComplete ||(
        <IconButton
          icon={"close"}
          size={40}
          color={GlobalStyles.colors.dark1}
          onPress={completeGoalHandler}

          // create conditional view for completed, incomplete and incomplete with unfinished tasks
          // onpress alert for can complete or want to complete
        /> )}
      </View> */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
        <Text style={styles.titles}>I Will</Text>
        <IconButton
          icon={"create-outline"}
          size={30}
          color={GlobalStyles.colors.dark1}
          onPress={editGoalHandler}
          style={styles.editButton}
          //title={'Edit'}
        />
        </View>
        <Text style={styles.detailsText}>{selectedGoal.willDescription}</Text>
        <Text style={styles.titles}>so that</Text>
        <Text style={styles.detailsText}>{selectedGoal.whyDescription}</Text>
        <Text style={styles.titles}>by</Text>
        <Text style={styles.detailsText}>
          {getFormatedDate(selectedGoal.deadline)}
        </Text>
      </View>
      <View style={styles.taskTitleContainer}>
        <Text style={styles.titles}>{selectedGoal.completedTasks} out of {selectedGoal.totalTasks} tasks complete </Text>
        {/* if complete = total display complete goal option  */}
      </View>
      <TasksOutput tasks={goalTasks} />
    </View>
  );
}
export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    // width: 200,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  detailsContainer: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.white,
    padding: 8,
  },
  titles: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.dark1,
  },
  detailsText: {
    fontSize: 16,
    color: GlobalStyles.colors.dark1,
  },
  titleContainer: {
    //backgroundColor: GlobalStyles.colors.layer1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goalContainer: {
    //padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: GlobalStyles.colors.layer1,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.dark1,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
  },
  taskTitleContainer: {
    alignItems: "center",
    padding: 12,

  },
  editButton: {
    padding: 0, 
    marginVertical: 0,
    marginHorizontal: 0,
},
});

//set the title of the goal as the title on the card or 'add goal'.
// trash and complete goal icons need to be at the top of the form .
