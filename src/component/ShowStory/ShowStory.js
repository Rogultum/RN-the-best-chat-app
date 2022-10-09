/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Image, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

import styles from './ShowStory.style';

function ShowStory(props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Avatar.Image
          size={28}
          source={{
            uri: props.images.item.userPhotoURL
              ? props.images.item.userPhotoURL
              : 'https://png.pngitem.com/pimgs/s/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
          }}
        />
        <Text style={[styles.username, { color: colors.tertiary }]}>
          @{props.images.item.username}
        </Text>
      </View>
      <Image style={[styles.image]} source={{ uri: props.images.item.photoURL }} />
    </View>
  );
}

export default ShowStory;
