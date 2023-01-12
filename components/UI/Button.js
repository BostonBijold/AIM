import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/colors";


function Button({children, onPress}) {
    return (
        <View>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 8, 
        padding: 8,
        backgroundColor: GlobalStyles.colors.layer1light,
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: GlobalStyles.colors.white,
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.layer1
    },
    pressed: {
        opacity: 0.75
    }
});