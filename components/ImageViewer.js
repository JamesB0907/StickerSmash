import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    // If there is no selected image, display the placeholder image
const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;
// Image component is used to display the image
    return (
        <Image source={imageSource} style={styles.image} />
    );
}
// imposes a standard width and height on the image
const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});