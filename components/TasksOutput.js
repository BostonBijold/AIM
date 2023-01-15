import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import TaskList from "../storage/TaskList";

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
    borderRadius: 8
  },
});
