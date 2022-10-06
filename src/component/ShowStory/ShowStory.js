import React from 'react';
import { Image, View } from 'react-native';

import styles from './ShowStory.style';

function ShowStory(props) {
  // console.log('sbt1', JSON.stringify(props.images.item[0].photoURL));

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.images.item[0].photoURL }} />
    </View>
  );
}

export default ShowStory;
