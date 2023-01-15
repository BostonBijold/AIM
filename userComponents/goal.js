import { View, FlatList, Text} from "react-native";

const TEST_GOALS = [
  {
    id: "1",
    goalWhat: "I will: ",
    goalWhy: "so that",
    deadline: new Date("2023-01-01"),
  },
  {
    id: "2",
    goalWhat: "I will: ",
    goalWhy: "so that",
    deadline: new Date("2023-02-02"),
  },
];

function renderGoalItem(itemData) {
  return <Text>{itemData.item.goalWhat}</Text>;
}

function GoalsOutput({}) {
  return (
    <FlatList
      data={TEST_GOALS}
      renderItem={renderGoalItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default GoalsOutput;
