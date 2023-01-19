import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import GoalList from "../storage/GoalLIst";


function GoalsOutput({goals}) {
    return(
        <View style={styles.container}> 
            <GoalList goals={goals}/>
        </View>

    );
}

export default GoalsOutput;

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        backgroundColor: GlobalStyles.colors.white
    }
});