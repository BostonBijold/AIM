import { FlatList, StyleSheet, Text, View } from "react-native";
import GoalItem from "../components/GoalItem";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/colors";

function renderGoalItem(itemData) {
  return <GoalItem {...itemData.item} />;
}

function GoalList({ goals }) {
  return (
    <View style={styles.container}>
    <FlatList
      data={goals}
      renderItem={renderGoalItem}
      keyExtractor={(item) => item.id}
    />
    <View style={styles.buttonAlignment}>
    <View style={styles.buttonContainer}>
          <IconButton
          icon={"add"}
          size={30}
          color={GlobalStyles.colors.dark1}
        ></IconButton>
        </View>
        </View>
    </View>

  );
}

export default GoalList;

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
    width: '100%',
    justifyContent: "center",
    alignItems: "center",

  },
  buttonAlignment: {
    alignItems: 'center'
  }
});

//Pass a onPress to IconButton to navigate to a Manage goal screen. This will free up the top right for info. 