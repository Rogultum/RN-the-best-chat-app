import { useNavigation } from '@react-navigation/native';

import React from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

import { useSelector } from 'react-redux';

import styles from './ContactsList.style';

function ContactsList(props) {
  const { contacts } = props;
  const navigation = useNavigation();
  const { colors } = useTheme();

  const user = useSelector((state) => state.user.value);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('Chat', { receiverId: contacts.id, title: contacts.username })
      }
    >
      <Avatar.Image
        size={50}
        source={{
          uri: contacts.photoURL
            ? contacts.photoURL
            : 'https://png.pngitem.com/pimgs/s/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
        }}
      />
      <View style={styles.inner_container}>
        <Text style={[styles.username, { color: colors.tertiary }]}>
          {' '}
          {contacts.username === user.username ? 'Note to Self' : contacts.username}
        </Text>
      </View>
    </Pressable>
  );
}

export default ContactsList;
