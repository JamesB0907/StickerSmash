import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Button component is used to customize buttons on the app. It renders one of two types of buttons based on the theme prop.
export default function Button({label, theme, onPress}) {
    if (theme === "primary") {
        return (
            /*
                The primary theme is used to style the button with a white background and black text color. The button is also given a border with a color of #ffd33d. 
            */
            <View style={[styles.buttonContainer, { 
                borderWidth: 4,
                borderColor: "#ffd33d",
                borderRadius: 18 
                }]}>
                <Pressable
                    style={[styles.button, { backgroundColor: "#fff" }]}
                    onPress={onPress}
                >
                    <FontAwesome
                        name="picture-o"
                        size={18}
                        color="#25292e"
                        style={styles.buttonIcon}
                    />
                    <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
                </Pressable>
            </View>
        )
    } // If the theme is not primary, the button is styled with a black background and white text color.
        return (
            <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16,
    }
})