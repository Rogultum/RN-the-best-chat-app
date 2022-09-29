import React from 'react';
import { Text, View } from 'react-native';

import styles from './MessageBox.style';

function MessageBox({ sender = false }) {
  return (
    <View
      style={[styles.container, { marginLeft: sender ? 240 : 0, marginRight: sender ? 0 : 240 }]}
    >
      <Text style={styles.text}>
        MessageBoxMessageBoxMessageBoxMessageBoxMessageBoxMessageBoxMessageBoxMessageBoxMessageBox
      </Text>
    </View>
  );
}

export default MessageBox;
