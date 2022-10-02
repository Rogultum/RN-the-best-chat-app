/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useSelector } from 'react-redux';

import styles from './MessageBox.style';

function MessageBox(props) {
  const userId = useSelector((state) => state.user.value.id);

  const { colors } = useTheme();

  const senderUser = userId === props.messages.senderId;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inner_container,
          {
            backgroundColor: colors.secondary,
            marginLeft: senderUser ? 230 : 0,
            marginRight: senderUser ? 0 : 230,
          },
        ]}
      >
        <Text style={styles.text}>{props.messages.text}</Text>
      </View>
    </View>
  );
}

export default MessageBox;
