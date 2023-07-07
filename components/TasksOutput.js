import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import TaskList from "../storage/TaskList";

function TasksOutput({ tasks, goal, focusId }) {
  return (
    <View style={styles.container}>
      {/* task list view for focus */}
      {focusId && <TaskList tasks={tasks} focusId={focusId} />}
      {/* task list view for goals. */}
      {goal && <TaskList tasks={tasks} goal={goal} />}
    </View>
  );
}

export default TasksOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.white,
    borderRadius: 8,
  },
});
