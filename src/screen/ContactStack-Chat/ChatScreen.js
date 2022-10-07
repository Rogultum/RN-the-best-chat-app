/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  TextInput,
  useTheme,
} from 'react-native-paper';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { FlashList } from '@shopify/flash-list';
import * as Location from 'expo-location';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import MessageBox from '../../component/MessageBox/MessageBox';
import { db } from '../../utils/firebase';
import styles from './ChatScreen.style';

function ChatScreen({ route }) {
  const user = useSelector((state) => state.user.value);

  const { colors } = useTheme();

  const [messagesList, setMessagesList] = useState([]);

  const [text, setText] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const [location, setLocation] = useState();

  const { receiverId } = route.params;

  const roomId = user.id + receiverId;
  const roomId2 = receiverId + user.id;
  const docRef = doc(db, 'chatroom', roomId);
  const docRef2 = doc(db, 'chatroom', roomId2);

  const updateDatabase = async () => {
    let docSnap = await getDoc(docRef);
    const docSnap2 = await getDoc(docRef2);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        message: arrayUnion({
          senderId: user.id,
          receiverId,
          text,
        }),
      });
    } else if (docSnap2.exists()) {
      docSnap = docSnap2;
      await updateDoc(docRef2, {
        message: arrayUnion({
          senderId: user.id,
          receiverId,
          text,
        }),
      });
    } else {
      await setDoc(doc(db, 'chatroom', roomId), {
        users: [user.id, receiverId],
        message: [
          {
            senderId: user.id,
            receiverId,
            text,
          },
        ],
      });
    }
  };

  const fetchMessages = async () => {
    let docSnap = await getDoc(docRef);
    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) docSnap = docSnap2;
    if (docSnap.exists()) {
      const messages = [];
      docSnap.data().message.forEach((message) => {
        messages.push(message);
      });
      setMessagesList(messages);
    }
  };

  const renderMessages = ({ item }) => <MessageBox messages={item} />;

  const [visible, setVisible] = useState();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      showDialog();
    }

    const locationData = await Location.getCurrentPositionAsync({});
    setLocation(locationData);
    console.log(location);
    // const docRef = doc(db, 'chatroom', user.id);
    // await updateDoc(docRef, {
    //   'location.id': arrayUnion(locationData.timestamp),
    //   'location.latitude': arrayUnion(locationData.coords.latitude),
    //   'location.longitude': arrayUnion(locationData.coords.longitude),
    //   'location.photoURL': arrayUnion(photoURL),
    // });
  };

  useEffect(() => {
    fetchMessages();
  }, [updateDatabase]);

  return (
    <View style={styles.container}>
      <Text onPress={fetchMessages}>{receiverId}</Text>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              You&aposve denied location access! To continue, Please grant acces from setting.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.secondary }]}>
            <IconButton
              style={styles.close_button}
              icon="close-circle-outline"
              size={14}
              iconColor={colors.tertiary}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Text style={[styles.modalText, { color: colors.tertiary }]}>Get your location.</Text>
            <View style={styles.selection_button}>
              <IconButton
                icon="map-marker-multiple-outline"
                mode="outlined"
                iconColor={colors.tertiary}
                size={20}
                onPress={() => getCurrentLocation()}
              />
            </View>
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={[styles.textStyle, { color: colors.tertiary }]}>
                Share your location.
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlashList data={messagesList} renderItem={renderMessages} estimatedItemSize={100} />
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          left={<TextInput.Icon icon="emoticon-outline" />}
          right={<TextInput.Icon onPress={() => setModalVisible(!modalVisible)} icon="paperclip" />}
          value={text}
          mode="outlined"
          theme={{ roundness: 50 }}
          onChangeText={setText}
        />
        <Icon
          style={styles.icon}
          name="send"
          size={40}
          onPress={() => {
            updateDatabase();
            setText('');
          }}
        />
      </View>
    </View>
  );
}

export default ChatScreen;
