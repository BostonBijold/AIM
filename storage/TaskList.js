import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskItem from "../components/TaskItem";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

function renderTaskItem(itemData) {
  return <TaskItem {...itemData.item} />;
}

function TaskList({ tasks }) {
  const navigation = useNavigation();

  function AddItem() {
    navigation.navigate("Manage Task");
  }

  return (
    <View style={styles.container}>
      <FlatList
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

//Pass a onPress to IconButton to navigate to a Manage goal screen. This will free up the top right for info.
