import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { getFormatedDate } from "../util/date";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function IconDisplay(isCompleted) {
  let icon = "";
  if (isCompleted === true) {
    icon = "checkbox";
  } else {
    icon = "close";
  }
  return <Ionicons name={icon} />;
  // let icon = ''
  // if (isComplete === true) {
  //     icon = 'checkmark'
  // } else {
  //     icon = 'checkmark'
  // }
  // below are attemts at inline icon changes.
  //           <Ionicons name={iconDisplay(isCompleted)} />
  //          {isCompleted ? <Ionicons name={'checkbox'} /> : <Ionicons name={'close'} /> }

  //build a external function? why? it should work on the same page without a different file..
  //Build a component!
}

function GoalItem({
  title,
  isComplete,
  willDescription,
  whyDescription,
  deadline,
}) {
  const navigation = useNavigation();

  function goalPressHandler() {
    navigation.navigate("Manage Goal");
  }

  return (
    <Pressable
      onPress={goalPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.goalContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.completeContainer}>
            {isComplete && (
              <Ionicons
                name={"checkmark"}
                color={GlobalStyles.colors.dark1}
                size={30}
              />
            )}
            {isComplete || (
              <Ionicons
                name={"close"}
                color={GlobalStyles.colors.dark1}
                size={30}
              />
            )}
          </View>
          <View>
          <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.textBase}>{getFormatedDate(deadline)}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.descriptorText}>I will:</Text>
          <Text style={[styles.textBase, styles.descriptionContainer]}>
            {willDescription}
          </Text>
          <Text style={styles.descriptorText}>so that:</Text>
          <Text style={[styles.textBase, styles.descriptionContainer]}>
            {whyDescription}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalContainer: {
    //padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.layer1,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.dark1,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.05,
  },
  textBase: {
    color: GlobalStyles.colors.text1,
  },
  completeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    height: 50,
    width: 50,
  },
  descriptionContainer: {
    minWidth: 100,
    maxWidth: 275,
    textAlign: "left",
  },
  pressed: {
    opacity: 0.75,
  },
  descriptorText: {
    color: GlobalStyles.colors.dark1,
    fontSize: 18,
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: GlobalStyles.colors.layer2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 24,
  },
  dateContainer: {
    margin: 8,
    minWidth: 30,
  },
});
