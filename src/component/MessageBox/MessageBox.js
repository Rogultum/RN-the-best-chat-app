/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

import styles from './MessageBox.style';

function MessageBox(props) {
  const userId = useSelector((state) => state.user.value.id);

  const { colors } = useTheme();

  const senderUser = userId === props.messages.senderId;
  const typeText = props.messages.type === 'text';
  const typeLocation = props.messages.type === 'location';

  return (
    <View style={styles.container}>
      {typeLocation && (
        <MapView
          style={[
            styles.map,
            {
              alignSelf: senderUser ? 'flex-end' : 'flex-start',
            },
          ]}
          initialRegion={{
            latitude: props.messages.latitude,
            longitude: props.messages.longitude,
            latitudeDelta: 3,
            longitudeDelta: 3,
          }}
          maxZoomLevel={20}
          minZoomLevel={10}
        >
          <Marker
            coordinate={{ latitude: props.messages.latitude, longitude: props.messages.longitude }}
          />
        </MapView>
      )}
      {typeText && (
        <View
          style={[
            styles.inner_container,
            {
              backgroundColor: colors.secondary,
              alignSelf: senderUser ? 'flex-end' : 'flex-start',
            },
          ]}
        >
          <Text style={styles.text}>{props.messages.text}</Text>
        </View>
      )}
    </View>
  );
}

export default MessageBox;
