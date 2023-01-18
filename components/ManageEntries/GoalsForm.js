import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/colors";
import { getFormatedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";
import IconButton from "../UI/IconButton";

function GoalsForm({ onCancel, onSubmit, submitButtonLable, defaultValues}) {
const [inputs, setInputs] = useState({
    //Creates oject values for the goal

    title: {
        value: defaultValues ? defaultValues.title : "", 
        isValid: true
    },
    willDescription: { 
        value: defaultValues ? defaultValues.willDescription : "", 
        isValid: true,
    }, 
    whyDescription: {
        value: defaultValues ? defaultValues.whyDescription : "",
        isValid: true
    },
    deadline: {
        value: defaultValues ? getFormatedDate(defaultValues.deadline) : "",
        isValid: true,
    },
    isComplete: {
        value: defaultValues ? defaultValues.isComplete : false,
        isValid: true,
    },
    completedTasks: {
      value: defaultValues ? defaultValues.completedTasks : 0, 
    },
    totalTasks: {
      value: defaultValues ? defaultValues.totalTasks : 0, 
    }
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
    const goalData = {
        title: inputs.title.value, 
        willDescription: inputs.willDescription.value,
        whyDescription: inputs.whyDescription.value, 
        deadline: new Date(inputs.deadline.value),
        isComplete: inputs.isComplete.value, 
        completedTasks: inputs.completedTasks.value,
        totalTasks: inputs.totalTasks.value
    };

    const titleIsValid = goalData.title.trim().length > 0;
    const willDescriptionIsValid = goalData.willDescription.trim().length > 0;
    const whyDescriptionIsValid = goalData.whyDescription.trim().length > 0;
    const deadlineIsValid = goalData.deadline.toString() !== "Invalid Date";

    if (!titleIsValid || !willDescriptionIsValid || !whyDescriptionIsValid || !deadlineIsValid) {
        setInputs((curInputs) => {
            return{
            title: {value: curInputs.title.value, isValid: titleIsValid}, 
            willDescription: {value: curInputs.willDescription.value, isValid: willDescriptionIsValid},
            whyDescription: { value: curInputs.whyDescription.value, isValid: whyDescriptionIsValid},
            deadline: { value: curInputs.deadline.value, isValid: deadlineIsValid},
            isComplete: {value: curInputs.isComplete.value}
            };
        });
        return;
    }

  onSubmit(goalData);
}

  const formIsInvalid =
    !inputs.willDescription.isValid ||
    !inputs.whyDescription.isValid ||
    !inputs.deadline.isValid ||
    !inputs.title.isValid;


  return (
    <View style={styles.form}>
      <View>
      <Input
          style={styles.rowInput}
          label="Title:"
          invalid={!inputs.willDescription.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'title'),
            value: inputs.title.value
          }}
        />
        <Input
          style={styles.rowInput}
          label="I will:"
          invalid={!inputs.willDescription.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'willDescription'),
            value: inputs.willDescription.value
          }}
        />
                <Input
          style={styles.rowInput}
          label="So that:"
          invalid={!inputs.willDescription.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, 'whyDescription'),
            value: inputs.whyDescription.value
          }}
        />

        <Input
          style={styles.rowInput}
          label="By:"
          invalid={!inputs.deadline.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "deadline"),
            value: inputs.deadline.value,
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

export default GoalsForm;

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
