import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import GoalsForm from "../components/ManageEntries/GoalsForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { GoalContext } from "../storage/goal-context";

function ManageGoals({ route, navigation }) {
  const goalsCtx = useContext(GoalContext);

  const editedGoalId = route.params?.goalId;
  const isEditing = !!editedGoalId;

  const selectedGoal = goalsCtx.goals.find(goal => goal.id === editedGoalId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Goal" : "Add Goal",
    });
  }, [navigation, isEditing]);

  //if complete - conditional change to show different icon for complete.

  function deleteGoalHandler() {
    goalsCtx.deleteGoal(editedGoalId);
    navigation.goback();
  }

  function completeGoalHandler() {
    navigation.goBack();
  }

  function confirmHandler(goalData) {
   if (isEditing) {
    console.log(goalData);
    goalsCtx.updateGoal(editedGoalId, goalData);
   } else {
    console.log(goalData);
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
        {isEditing && (
          <View style={styles.completeCancel}>
            <IconButton
              icon={"trash"}
              size={50}
              color={GlobalStyles.colors.dark1}
              onPress={deleteGoalHandler}
            />
            <IconButton
              icon={"checkbox"}
              size={50}
              color={GlobalStyles.colors.dark1}
              onPress={completeGoalHandler}
            />
          </View>
        )}
        <GoalsForm onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLable={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedGoal}
        />
    </View>
  );
}

export default ManageGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  completeCancel: {
    flexDirection: "row",
    justifyContent: 'space-between'
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


