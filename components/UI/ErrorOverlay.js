import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/colors";
import Button from "./Button";

function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured! </Text>
      <Text style={styles.text}>{message}</Text>
    {/* <Button onPress={onConfirm} >Okay</Button> */}
          </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.white,
  },
  text: {
    color:GlobalStyles.colors.dark1,
    textAlign: 'center', 
    margin: 8, 
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
  },

});
