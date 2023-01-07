import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import { getFormatedDate } from "../util/date";
import { Ionicons } from '@expo/vector-icons';


function IconDisplay(isCompleted) {
    let icon = '';
    if (isCompleted === true) {
        icon = 'checkbox'
    } else {
        icon = 'close'
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


function GoalItem({ isCompleted, willDescription, whyDescription, deadline }) {
  return (
    <Pressable>
      <View style={styles.goalContainer}>
        <View style={styles.completeContainer}>
            <IconDisplay isCompleted={isCompleted} />
            <View>
          </View>
        </View>
        <View >
          <Text style={[styles.textBase, styles.descriptionContainer]}>{willDescription}</Text>
          <Text style={[styles.textBase, styles.descriptionContainer]}>{whyDescription}</Text>
          <Text>{getFormatedDate(deadline)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.layer1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    shadowColor: GlobalStyles.colors.dark1,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: .05
  },
  textBase: {
    color: GlobalStyles.colors.text1,
  },
  completeContainer: {
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 8, 
    height: 50,
    width: 50

  },
  descriptionContainer: {
    minWidth: 100,
    maxWidth: 275,
    textAlign: 'left'
  }
});
