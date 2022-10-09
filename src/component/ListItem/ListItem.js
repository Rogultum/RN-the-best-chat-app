/* eslint-disable no-unused-vars */
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

import styles from './ListItem.style';

function ListItem({ title, description, onPress, icon, iconSize }) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Avatar.Icon size={iconSize} icon={icon} />
      <View style={styles.inner_container}>
        <Text style={[styles.title_text, { color: colors.tertiary }]}>{title}</Text>
        <Text style={[styles.description_text, { color: colors.tertiary }]}>{description}</Text>
      </View>
    </Pressable>
  );
}

export default ListItem;
