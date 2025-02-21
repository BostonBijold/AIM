import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/colors";


function IconButton({ icon, size, color, onPress, style, title }) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.buttonContainer, style]}>
        <Ionicons name={icon} size={size} color={color} />
        {title}
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 50, 
        padding: 6, 
        marginVertical: 2,
        marginHorizontal: 15,
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.75
    }
});