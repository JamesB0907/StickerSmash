// Imports from the React and React Native libraries
import { StyleSheet, View, Platform } from "react-native";
import { useRef, useState } from "react";
// dom-to-image docs at: https://github.com/tsayen/dom-to-image
import domtoimage from "dom-to-image";
// expo-media-library docs at: https://docs.expo.dev/versions/latest/sdk/media-library/
import * as MediaLibrary from "expo-media-library";
// expo-status-bar docs at: https://docs.expo.dev/versions/latest/sdk/status-bar/
import { StatusBar } from "expo-status-bar";
// expo-image-picker docs at: https://docs.expo.dev/versions/latest/sdk/image-picker/
import * as ImagePicker from "expo-image-picker";
// react-native-gesture-handler docs at: https://docs.swmansion.com/react-native-gesture-handler/docs/
import { GestureHandlerRootView } from "react-native-gesture-handler";
// react-native-view-shot docs at: https://github.com/gre/react-native-view-shot
import { captureRef } from "react-native-view-shot";

import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  // imageRef is used to capture the image of the view
  const imageRef = useRef();
  // status is used to check the permission status
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // pickedEmoji is used to store the selected emoji
  const [pickedEmoji, setPickedEmoji] = useState(null);
  // isModalVisible is used to show/hide the emoji picker modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // showAppOptions is used to show/hide the app options
  const [showAppOptions, setShowAppOptions] = useState(false);
  // selectedImage is used to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // requestPermission is used to request permission to access the media library
  if (status === null) {
    requestPermission();
  }

  // pickImageAsync is used to pick an image from the gallery
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    // if the user cancels the image selection, an alert is shown and selectedImage is set to default image
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You didn't select any image.");
    }
  };
  // onReset is used to reset the app options
  const onReset = () => {
    setShowAppOptions(false);
  };
  // onAddSticker is used to show the emoji picker modal
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  // onCloseModal is used to hide the emoji picker modal
  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  // onSaveImageAsync is used to save the image to the media library
  const onSaveImageAsync = async () => {
    // If the platform is not web, the image is captured and saved to the media library
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
      // If the platform is web, the image is converted to jpeg and downloaded
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
        // Catch block to log a more detailed error message
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    //  GestureHandlerRootView allows the everything it's wrapping to use the gesture handler library
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {/*
              If the user has selected an emoji, the EmojiSticker component is rendered with the selected emoji 
            */}
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
        </View>
        {/*
          If the user has selected a photo, the display changes to allow stickers to be added to the selected image 
        */}
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            {/*
              When we instantiate the Button component, we pass the theme prop as primary, which will render the button with a different style. The button then gets constructed in a separate module, which is the Button.js file. The Button.js file contains the logic for rendering the button with different styles based on the theme prop. 
            */}
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onCloseModal}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onCloseModal} />
        </EmojiPicker>
        <StatusBar style="light" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
