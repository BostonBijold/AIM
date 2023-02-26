import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { getDateMinusDays, getFormatedDate } from "../util/date";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../storage/Task-Context";
import { useContext } from "react";
import { GoalContext } from "../storage/goal-context";
import { FocusContext } from "../storage/Focus-Context";

function FocusTaskItem({ id, goalId, isComplete, description, goalTitle }) {
  const navigation = useNavigation();
  const taskCtx = useContext(TaskContext);
  const focusCtx = useContext(FocusContext);
  const goalsCtx = useContext(GoalContext);

  const editedGoalId = goalId; //params? checks if a value is provided.
  //const isEditing = !!editedGoalId;
  const selectedGoal = goalsCtx.goals.find((goal) => goal.id === editedGoalId);

// get today's focus 
const todaysFocus = focusCtx.focus.filter((focus) => {
    const today = new Date(); // gets today's date
    const oneDay = getDateMinusDays(today, 1); // gets yesterday's date 
    return focus.focusDate > oneDay;
  });
  // end get today's focus 

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

  function returnTask() {
    const focus = focusCtx.focus[0]; // ensure the first focus is always today's focus

    focus.focusTasks.push(id);
    // add a check to focus tasks for task. 
    // better- only load tasks not in focus tasks. Add to addfocus screen 
    
    // console.log(focus);
    navigation.goBack();
  }

 // make a + press change the plus to a task and add in goal details screen. 
  //React Natvive Gesture Handler will allow for Item Swipe

  return (
    <Pressable
      onPress={returnTask}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskContainer}>
          <View style={styles.goalTitleContainer} >
        <Text style={styles.TitleText}>{goalTitle}</Text>
          </View>
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

export default FocusTaskItem;

const styles = StyleSheet.create({
  taskContainer: {
    //padding: 12,
    marginVertical: 8,
    //marginHorizontal: 12,
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
  completedContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.green,
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
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: GlobalStyles.colors.layer1,
    borderWidth: 2,
    alignItems: "center",
    //justifyContent: "space-between",
  },
  detailsContainer: {
    padding: 12,
  },
  goalTitleContainer: {
    backgroundColor: GlobalStyles.colors.layer1,
    borderTopEndRadius : 8,
    borderTopLeftRadius: 8, 
  },
  TitleText: {
    color: GlobalStyles.colors.white,
    fontSize: 15,
    padding: 3,
    paddingLeft: 8, 

  },

});
