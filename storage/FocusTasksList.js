import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import TaskItem from "../components/TaskItem";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import FocusTaskItem from "../components/FocusTaskItem";

function renderTaskItem(itemData, focusId) {
  return (
      <FocusTaskItem {...itemData.item} />
  );
}

function FocusTaskList({ tasks, focusId }) {
  const navigation = useNavigation();

  function AddItem() {
    //load task list for selection and add to focus list
    navigation.navigate("Add Task To Focus");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        // renderItem={renderTaskItem}
        renderItem={(item) => renderTaskItem(item, focusId)} // passes goal as props to function. No task to load.
        keyExtractor={(item) => item.id}
        extraData={[focusId]} //attempt to pass goal data.
        // extraData={tasks} //should rerender after task is saved.
        ListFooterComponent={
          <IconButton
            icon={"add"}
            size={30}
            color={GlobalStyles.colors.dark1}
            style={styles.buttonContainer}
            onPress={AddItem}
          ></IconButton>
        }
      />
    </View>
  );
}

export default FocusTaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    borderColor: GlobalStyles.colors.layer1,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: GlobalStyles.colors.layer1light,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
});
