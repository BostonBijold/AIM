import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";

// import GoalInput from "./modals/goalInput";
// import GoalItem from "./modals/goalItem";
// import Colors from "./constants/Colors";
// import GoalsOutput from "./userComponents/goal";

export default function GoalScreen() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    console.log(goals);
    endAddGoalHandler();
  }

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>AIM</Text>
      <Text>Enter Your Goal:</Text>
      <Button title="Add Goal" onPress={startAddGoalHandler} />
      <GoalInput
        visible={modalIsVisible}
        onCancel={endAddGoalHandler}
        onAddGoal={addGoalHandler}
      />
      <GoalsOutput />
      <View style={styles.goalList}>
        <FlatList
          data={goals}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} id={itemData.item.id} />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
              

      </View>
      <StatusBar style="auto" />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: "50%",
  },

  goalList: {
    flex: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 30, 
    fontWeight: 'bold',
    color: Colors.dark2,
    borderWidth: 2,
    borderBottomColor: Colors.dark1,
    padding: 12,
    borderRadius: 8,
    margin: 12
  }
});
