import { StyleSheet, TextInput, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/colors";

function Input({ label, textInputConfig, style, invalid }) {
  let inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiLine);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]} >
      <Text style={[styles.label, invalid && styles.invalidLabel]} >{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    fontSize: 18,
  },
  label: {
    fontSize: 12, 
    color: GlobalStyles.colors.dark1,
    marginBottom: 4,
  },
  inputMultiLine: {
    minHeight: 100, 
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.errorText,
  },
  invalidInput: {
    color: GlobalStyles.colors.errorText,
  }
});
