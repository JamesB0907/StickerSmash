import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
// MaterialIcons documentation: https://icons.expo.fyi/
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// EmojiPicker component is used to display the emoji picker modal
export default function EmojiPicker({ isVisible, children, onClose }) {
  return (
    // We use the Modal identifier to display this component as a modal
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          {/*
            The onPress prop is used to close the emoji picker modal
          */}
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {/*
          In this context, children refers to the EmojiList component that is passed as a child to the EmojiPicker component. This allows the EmojiList component to be rendered within the EmojiPicker component.
        */}
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '25%',
      width: '100%',
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '16%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
  });
  