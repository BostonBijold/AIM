import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import TaskList from "../storage/TaskList";

const DUMMY_TASKS = [
  {
    id: "t1",
    goalId: "g1",
    description: "Learn React Native.",
    isComplete: false,
  },
  {
    id: "t2",
    goalId: "g1",
    description: "Learn source control in bitbucket.",
    isComplete: false,
  },
  {
    id: "t3",
    goalId: "g1",
    description: "Add a focus screen.",
    isComplete: false,
  },
  {
    id: "t4",
    goalId: "g2",
    description: "Plan a pant-less weekend.",
    isComplete: false,
  },
];

function TasksOutput({ tasks }) {
  return (
    <View style={styles.container}>
      <TaskList tasks={tasks} />
    </View>
  );
}

export default TasksOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
  },
});
