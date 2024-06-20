import { View, Image } from "react-native";
// react-native-gesture-handler docs at: https://docs.swmansion.com/react-native-gesture-handler/docs/
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// react-native-reanimated docs at: https://docs.swmansion.com/react-native-reanimated/
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
/*
imageSize is set to the static value of 40, but is passed as a prop from the parent component so that the size of the sticker can be adjusted
*/
export default function EmojiSticker({ imageSize, stickerSource }) {
    // We start by defining the shared values that will be used to animate the image
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  // We define the drag gesture by using the Pan gesture handler to move the sticker 
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });
  // We define the double tap gesture by using the Tap gesture handler to scale the sticker
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    });
    // withSpring modifies the scaleImage value to animate the scaling of the sticker
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  // containerStyle modifies the translateX and translateY values to animate the movement of the sticker
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
            {/* We add Animated to the Image component to animate the scaling of the sticker */}
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            /* imageStyle is passed as a prop to the Image component */
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
