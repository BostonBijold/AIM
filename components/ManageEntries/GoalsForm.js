import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFormatedDate } from "../../util/date";
import Button from "../UI/Button";
import Input from "./Input";

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
        value: defaultValues ? defaultValues.isComplete : "",
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

  const formIsInvalid =
    !inputs.willDescription.isValid ||
    !inputs.whyDescription.isValid ||
    !inputs.deadline.isValid ||
    !inputs.title.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Goal </Text>
      <View>
      <Input
          style={styles.rowInput}
          label="Title:"
          invalid={!inputs.willDescription}
          textInputConfig={{}}
        />
        <Input
          style={styles.rowInput}
          label="I will:"
          invalid={!inputs.willDescription}
          textInputConfig={{}}
        />
                <Input
          style={styles.rowInput}
          label="So that:"
          invalid={!inputs.willDescription}
          textInputConfig={{}}
        />

        <Input
          style={styles.rowInput}
          label="By:"
          invalid={!inputs.deadline.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.deadline.value,
          }}
        />
        {formIsInvalid && <Text style={styles.errorText}> Invalid Entry </Text>}
        <View>
            <Button>Cancel</Button>
            <Button>Save</Button>
        </View>
      </View>
    </View>
  );
}

export default GoalsForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
});
