import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/colors";
import { getFormatedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";
import IconButton from "../UI/IconButton";

function TaskForm({ onCancel, onSubmit, submitButtonLable, defaultValues, goal_Id, goalTitle}) {
  //console.log(defaultValues.goalTitle);
const [inputs, setInputs] = useState({
    //Creates oject values for the goal
    // goalTitle: 'Remove embed', // pass title from goal for storage in task

    // flatlist of goal titles for adding tasks to? ----------------------------------------------------------<

    goalId: {
        value: goal_Id , //does not check for value but does add the goalID. will be invisible soon.
        isValid: true
    },
    
    description: { 
        value: defaultValues ? defaultValues.description : "", 
        isValid: true,
    }, 
    goalTitle: {
      value: defaultValues ? defaultValues.goalTitle : goalTitle,
      isValid: true,
    },
    isComplete: {
        value: defaultValues ? defaultValues.isComplete : false,
        isValid: true,
    },
});


function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //standard JS to dynamicaly select a value to update.
        // the identifier selects the object key to update.
      };
    });
  }

function submitHandler() {
    const taskData = {
        goalTitle: inputs.goalTitle.value, // pass title from goal for storage in task
        goalId: inputs.goalId.value, 
        description: inputs.description.value,
        isComplete: inputs.isComplete.value
    };

 //   const goalIdIsValid = taskData.goalId.trim().length > 0;
 const goalTitleIsValid = taskData.goalTitle.trim().length > 0;
  
 const descriptionIsValid = taskData.description.trim().length > 0;

    if (!goalTitleIsValid || !descriptionIsValid ) {
        setInputs((curInputs) => {
            return{
            // goalTitle: {value: curInputs.goalTitle.value, isValid: goalTitleIsValid},
            goalId: {goal_Id}, 
            goalTitle: {value:goalTitle}, 
            description: {value: curInputs.description.value, isValid: descriptionIsValid},
            isComplete: {value: curInputs.isComplete.value}
            };
        });
        return;
    }

  onSubmit(taskData);
}

  const formIsInvalid =
    !inputs.description.isValid ||
    !inputs.goalTitle.isValid;


  return (
    <View style={styles.form}>
      <View>
      <Input
          style={styles.rowInput}
          label="Goal Title:"
          invalid={!inputs.goalTitle.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'goalTitle'),
            value: inputs.goalTitle.value
          }}
        />
        <Input
          style={styles.rowInput}
          label="I will:"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputs.description.value
          }}
        />
        {formIsInvalid && <Text style={styles.errorText}> Invalid Entry </Text>}
        <View style={styles.buttonsContainer}>
            <Button style={styles.button} onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLable}</Button>
        </View>
      </View>
    </View>
  );
}

export default TaskForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.dark1,
    marginVertical: 24,
    textAlign: "center",
  },
  //Limit title input char limit.
  buttonContainer: {
    borderColor: GlobalStyles.colors.layer1,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: GlobalStyles.colors.layer1light,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    margin: 8
  },
});

//align items center sets the full view to fit all the space it needs, not can take. 
