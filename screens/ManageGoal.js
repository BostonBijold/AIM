import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import GoalsForm from "../components/ManageEntries/GoalsForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";

function ManageGoals({ route, navigation }) {
  const editedGoalId = route.params?.goalId;
  const isEditing = !!editedGoalId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Goal Title" : "Add Goal",
    });
  }, [navigation, isEditing]);

  //if complete - conditional change to show different icon for complete.

  function deleteGoalHandler() {}

  function completeGoalHandler() {}

  function addTaskHandler() {}

  function closeHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <GoalsForm />
        {isEditing && (
          <View style={styles.completeCancel}>
            <IconButton
              icon={"trash"}
              size={50}
              color={GlobalStyles.colors.dark1}
              onPress={closeHandler}
            />
            <IconButton
              icon={"checkbox"}
              size={50}
              color={GlobalStyles.colors.dark1}
              onPress={closeHandler}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default ManageGoals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  completeCancel: {
    flexDirection: "row",
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

{
  /* <View style={styles.container}>
<View style={styles.contentContainer}>
  <Text>I will: </Text>
  <TextInput />
  <Text>so that: </Text>
  <TextInput />
  <Text>By: </Text>
  <TextInput />
</View>
<View style={styles.buttonContainer}>
  <IconButton
    icon={"add"}
    size={50}
    color={GlobalStyles.colors.dark1}
  ></IconButton>
</View>
{isEditing && (
  <View style={styles.completeCancel}>
    <IconButton
      icon={"trash"}
      size={50}
      color={GlobalStyles.colors.dark1}
      onPress={closeHandler}
    />
    <IconButton
      icon={"checkbox"}
      size={50}
      color={GlobalStyles.colors.dark1}
      onPress={closeHandler}
    />
  </View>
)}

</View> */
}
