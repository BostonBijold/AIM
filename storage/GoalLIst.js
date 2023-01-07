import { FlatList, StyleSheet, Text, View } from "react-native";
import GoalItem from "../components/GoalItem";

function renderGoalItem(itemData) {
  return (
    <GoalItem {...itemData.item} />
  );
}

function GoalList({ goals }) {
  return <FlatList data={goals} renderItem={renderGoalItem} keyExtractor ={(item) => item.id} />;
}

export default GoalList;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        padding: 2,

    }
});