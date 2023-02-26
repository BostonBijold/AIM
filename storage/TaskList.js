import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import TaskItem from "../components/TaskItem";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { FocusContext } from "./Focus-Context";

function renderTaskItem(itemData) {
  return <TaskItem {...itemData.item} />;
}

function TaskList({ tasks, goal, focusId, extraData}) {
  const focusCtx = useContext(FocusContext);
  const activeFocus = focusCtx.focus.find((focus) => focus.id === focusId);
  const navigation = useNavigation();
  const [render, setRender] = useState(false);


  function AddItem() {
    if (goal) {
      navigation.navigate("Manage Task",{goal:goal});
      //opens new task with Goal for adding.
    } else {
      setRender(true)
      navigation.navigate("Add Task To Focus", focusId);
      //push task to focus obj and close.
      // activeFocus.focusTasks.push(task)
      // navigation.goBack();
      //opens add focus task for adding task to focus.
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        // renderItem={renderTaskItem}
        renderItem={(item) => renderTaskItem(item, AddItem)} // passes goal as props to function. No task to load.
        keyExtractor={(item) => item.id}
        // extraData={[]} //attempt to pass goal data.
        extraData={goal} //should rerender after task is saved.
        // extra data will rerender if the .state. changes. 
        //No NO NO state don't work.. 
        // figure out the state prob. 
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

export default TaskList;

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
  pressed: {
    opacity: 0.75,
  },
});

//Pass a onPress to IconButton to navigate to a Manage goal screen. This will free up the top right for info.
