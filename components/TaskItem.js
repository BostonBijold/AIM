import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { getFormatedDate } from "../util/date";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../storage/Task-Context";
import { useContext } from "react";
import { GoalContext } from "../storage/goal-context";

function TaskItem({ id, goalId, isComplete, description }) {
  const navigation = useNavigation();
  const taskCtx = useContext(TaskContext);
  const goalsCtx = useContext(GoalContext);

  const editedGoalId = goalId; //params? checks if a value is provided.
  //const isEditing = !!editedGoalId;
  const selectedGoal = goalsCtx.goals.find((goal) => goal.id === editedGoalId);

  function completeTask() {
    taskCtx.updateTask(id, {
      goalId: goalId,
      isComplete: true,
      description: description,
    });
    goalsCtx.updateGoal(goalId, {
      title: selectedGoal.title,
      willDescription: selectedGoal.willDescription,
      whyDescription: selectedGoal.whyDescription,
      deadline: selectedGoal.deadline,
      isComplete:  selectedGoal.isComplete,
      completedTasks: selectedGoal.completedTasks + 1,
      //totalTasks: selectedGoal.totalTasks +1
    });
  }
  function activateTask() {
    taskCtx.updateTask(id, {
      goalId: goalId,
      isComplete: false,
      description: description,
      
    });
    goalsCtx.updateGoal(goalId, {
      title: selectedGoal.title,
      willDescription: selectedGoal.willDescription,
      whyDescription: selectedGoal.whyDescription,
      deadline: selectedGoal.deadline,
      isComplete:  selectedGoal.isComplete,
      completedTasks: selectedGoal.completedTasks - 1,
      //totalTasks: selectedGoal.totalTasks +1
    });
  }

  function editTask() {
    navigation.navigate("Manage Task", { taskId: id });
  }

  function taskPressHandler() {
    if (isComplete) {
      Alert.alert("Edit Task or reactivate?", "", [
        { text: "Edit", onPress: editTask },
        { text: "Activate", onPress: activateTask },
      ]);
    } else {
      Alert.alert("Edit Task or mark as Complete?", "", [
        { text: "Edit", onPress: editTask },
        { text: "Complete", onPress: completeTask },
      ]);
    }
    // update to task something
  }

  return (
    <Pressable
      onPress={taskPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskContainer}>
        <View style={styles.titleContainer}>
          {isComplete && (
            <View style={styles.completeContainer}>
              <Ionicons
                name={"checkmark"}
                color={GlobalStyles.colors.dark1}
                size={30}
              />
            </View>
          )}
          {/* In separate if checks for future swipe to complete changes.  */}
          {isComplete || (
            <View style={styles.completeContainer}>
              <Ionicons
                name={"close"}
                color={GlobalStyles.colors.dark1}
                size={30}
              />
            </View>
          )}
          {/* Add Swipe on task to swipe incomplete to complete */}
          <View style={styles.detailsContainer}>
            <Text style={[styles.textBase, styles.descriptionContainer]}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    //padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: GlobalStyles.colors.white,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.dark1,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
  },
  textBase: {
    color: GlobalStyles.colors.dark2,
    textAlign: "center",
    fontSize: 15,
  },
  completeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    height: 50,
    width: 50,
  },
  descriptionContainer: {
    minWidth: 100,
    maxWidth: 275,
    textAlign: "left",
  },
  pressed: {
    opacity: 0.75,
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 8,
    borderColor: GlobalStyles.colors.layer1,
    borderWidth: 2,
    alignItems: "center",
    //justifyContent: "space-between",
  },
  detailsContainer: {
    padding: 12,
  },
});
