import { StyleSheet, Text, View } from "react-native";
import IconButton from "../UI/IconButton";

function FocusForm() {
  return (
    <View>
      <Text>Focus Form</Text>
      <IconButton
            icon={"add"}
            size={30}
            color={GlobalStyles.colors.dark1}
            style={styles.buttonContainer}
            onPress={AddItem}
          />
          
    </View>
  );
}

const styles = StyleSheet.create({});

