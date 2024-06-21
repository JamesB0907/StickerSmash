import { Pressable, StyleSheet, Text } from 'react-native';
// MaterialIcons documentation: https://icons.expo.fyi/
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// label is being passed as a prop to the IconButton component
export default function IconButton({ icon, label, onPress }) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
        {/* The MaterialIcons component is used to display the icon */}
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    // The iconButton style is used to center the icon and label
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // The iconButtonLabel style is used to style the label
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
