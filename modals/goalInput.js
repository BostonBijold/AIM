import { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [enteredDescriptionText, setEnteredDescriptionText] = useState("");

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText('');
  }

  function descriptionInputHandler(enteredText) {
    setEnteredDescriptionText(enteredText);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Text style={styles.descriptiveText} >I will </Text>
        <TextInput
          placeholder="New Goal"
          value={enteredGoalText}
          onChangeText={goalInputHandler}
          style={styles.inputBox}
        />
        <Text style={styles.descriptiveText}>So that </Text>
        <TextInput
          placeholder="Outcome"
          value={enteredDescriptionText}
          onChangeText={descriptionInputHandler}
          style={styles.inputBox}
        />
        <Button title="Add" onPress={addGoalHandler} />
        <Button title="Cancel" onPress={props.onCancel} />
      </View>
    </Modal>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#495E45",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    backgroundColor: "#fff",
    width: "80%",
    textAlign: "center",
    height: 40,
    borderColor: Colors.dark2,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16
  },
  descriptiveText: {
    fontSize: 24,
  }
});
