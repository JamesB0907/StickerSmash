import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable } from 'react-native';
// The purpose of this component is to import a selection of emojis from the assets folder and display them in a horizontal list. In a full stack this might be used to pull a list of emojis from a database or API.
export default function EmojiList({ onSelect, onCloseModal }) {
  // This syntax is used to declare an array of emojis
  const [emoji] = useState([
    require('../assets/images/emoji1.png'),
    require('../assets/images/emoji2.png'),
    require('../assets/images/emoji3.png'),
    require('../assets/images/emoji4.png'),
    require('../assets/images/emoji5.png'),
    require('../assets/images/emoji6.png'),
  ]);

  return (
    // A Flatlist is a component that displays a scrolling list of items. In this case, the Flatlist is used to display the emojis in a horizontal list.
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      /*
        The renderItem prop is used to render each item in the list. In this case, the item is an emoji image. The onPress prop is used to select an emoji and close the emoji picker modal.
      */
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
