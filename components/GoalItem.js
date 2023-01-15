import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { getFormatedDate } from "../util/date";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


function GoalItem({ id,
  title,
  isComplete,
  willDescription,
  whyDescription,
  deadline,
}) {
  const navigation = useNavigation();

  function goalPressHandler() {
    navigation.navigate("GoalDetails", {goalId: id });
  }

  return (
    <Pressable
      onPress={goalPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.goalContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.completeContainer}>
            {/* update to a 'active' : 'completed at data' */}
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
    marginHorizontal: 12,
    backgroundColor: GlobalStyles.colors.white,
    borderColor: GlobalStyles.colors.layer1,
    borderWidth: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.dark1,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
  },
  textBase: {
    color: GlobalStyles.colors.dark1,
  },
  completeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.background,
    justifyContent: "center",
    alignItems: "center",
    //borderRadius: 8,
    height: 50,
    width: 50,
    //borderBottomLeftRadius: 8,
    borderTopLeftRadius: 6
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
    backgroundColor: GlobalStyles.colors.white,
    //borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: GlobalStyles.colors.dark1,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
    
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
