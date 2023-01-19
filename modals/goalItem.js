import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";

function GoalItem(props) {
    return(
        <View style={styles.goalItem}>
            <Text>{props.text}</Text>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 12,
        borderRadius: 8,
        backgroundColor: Colors.layer2,
        borderWidth: 2,
        padding: 12
    },
    pressedItem: {
        opacity: 0.5
    }
});