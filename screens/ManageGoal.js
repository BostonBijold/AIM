import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import GoalsForm from "../components/ManageEntries/GoalsForm";
import Button from "../components/UI/Button";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/colors";
import { GoalContext } from "../storage/goal-context";
import { deleteGoal, storeGoal, updateGoal } from "../util/http";

function ManageGoals({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const goalsCtx = useContext(GoalContext);
  const [error, setError] = useState();

  const editedGoalId = route.params?.goalId;
  const isEditing = !!editedGoalId;

  const selectedGoal = goalsCtx.goals.find((goal) => goal.id === editedGoalId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Goal" : "Add Goal",
    });
  }, [navigation, isEditing]);

  //if complete - conditional change to show different icon for complete.

  async function deleteGoalHandler() {
    setIsSubmitting(true);
    try {
      goalsCtx.deleteGoal(editedGoalId);
      await deleteGoal(editedGoalId);
      navigation.navigate("Goals");
    } catch (error) {
      setError("Could not fetch goals.");
      isSubmitting(false);
    }
  }

  function completeGoalHandler() {
    navigation.goBack();
  }

  async function confirmHandler(goalData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        goalsCtx.updateGoal(editedGoalId, goalData);
        await updateGoal(editedGoalId, goalData);
      } else {
        const id = await storeGoal(goalData);
        goalsCtx.addGoal({ ...goalData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later. ");
      setIsSubmitting(false);
    }
  }

  function addTaskHandler() {}

  function cancelHandler() {
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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
      <GoalsForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLable={isEditing ? "Update" : "Add"}
        defaultValues={selectedGoal}
      />
    </View>
  );
}

export default ManageGoals;

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
