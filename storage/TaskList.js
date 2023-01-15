import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskItem from "../components/TaskItem";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

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

function renderTaskItem(itemData) {
  return <TaskItem {...itemData.item} />;
}

function TaskList({ tasks }) {
  const navigation = useNavigation();

  function AddItem() {
    navigation.navigate("Manage Goal");
  }

  return (
    <View style={styles.container}>
      <FlatList
        // data={ DUMMY_TASKS }
        data={ tasks }
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
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
    borderWidth: 2,
    padding: 2,
    flex: 1,
  },
  buttonContainer: {
    borderColor: GlobalStyles.colors.layer1,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: GlobalStyles.colors.layer1light,
    alignItems: "center",
    marginTop: 4,
  },
});

//Pass a onPress to IconButton to navigate to a Manage goal screen. This will free up the top right for info.
