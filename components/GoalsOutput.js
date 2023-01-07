import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/colors";
import GoalList from "../storage/GoalLIst";

const DUMMY_GOALS = [
    {
        id: 'g1',
         //title: 'goal',
         willDescription: 'create a goal tracking app',
         whyDescription: 'I can track my goals and lear Agile and development.', 
         deadline: new Date ('2024-01-01'),
         isComplete: false,
         createdAt: new Date ('2023-01-07')
    },
    {
        id: 'g2',
         //title: 'goal',
         willDescription: 'potty train Harrison',
         whyDescription: 'we can stop spending money on dipers.', 
         deadline: new Date ('2023-07-01'),
         isComplete: false,
         createdAt: new Date ('2023-01-07')
    },
    {
        id: 'g3',
         //title: 'goal',
         willDescription: 'make going to the gym a habit',
         whyDescription: 'I can be more physically fit and a better Boston.', 
         deadline: new Date ('2023-01-01'),
         isComplete: true,
         createdAt: new Date ('2022-01-01')
    },
    {
        id: 'g4',
         //title: 'goal',
         willDescription: 'gain 5 pounds of muscle',
         whyDescription: 'I have a better physique and a stonger body.', 
         deadline: new Date ('2024-01-01'),
         isComplete: false,
         createdAt: new Date ('2023-01-07')
    }
]

function GoalsOutput() {
    return(
        <View style={styles.container}> 
            <GoalList goals={DUMMY_GOALS}/>
        </View>

    );
}

export default GoalsOutput;

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        padding: 24, 
        backgroundColor: GlobalStyles.colors.background
    }
})