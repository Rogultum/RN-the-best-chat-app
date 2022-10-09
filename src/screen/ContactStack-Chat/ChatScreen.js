/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-expressions */

/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, Text, View } from 'react-native';
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
// Regularly experimenting with flashlist
// import { FlashList } from '@shopify/flash-list';
import * as Location from 'expo-location';
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import MessageBox from '../../component/MessageBox/MessageBox';
import { saveLocation } from '../../redux/slice/locationSlice';
import { db } from '../../utils/firebase';
import styles from './ChatScreen.style';

function ChatScreen({ route }) {
  const user = useSelector((state) => state.user.value);

  const { colors } = useTheme();

  const [count, setCount] = useState(0);

  const [messagesList, setMessagesList] = useState([]);

  const [text, setText] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const reduxLocation = useSelector((state) => state.location.value);

  const { receiverId } = route.params;

  const roomId = user.id + receiverId;
  const roomId2 = receiverId + user.id;
  let docRef = doc(db, 'chatroom', roomId);
  const docRef2 = doc(db, 'chatroom', roomId2);

  const updateDatabase = useCallback(async () => {
    let docSnap = await getDoc(docRef);
    let type;
    if (text !== 'send Iocation...') type = 'text';
    else type = 'location';
    const docSnap2 = await getDoc(docRef2);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        message: arrayUnion({
          senderId: user.id,
          receiverId,
          text,
          type,
          latitude: type === 'location' ? reduxLocation.coords.latitude : ' ',
          longitude: type === 'location' ? reduxLocation.coords.longitude : ' ',
        }),
      });
    } else if (docSnap2.exists()) {
      docSnap = docSnap2;
      await updateDoc(docRef2, {
        message: arrayUnion({
          senderId: user.id,
          receiverId,
          text,
          type,
          latitude: type === 'location' ? reduxLocation.coords.latitude : ' ',
          longitude: type === 'location' ? reduxLocation.coords.longitude : ' ',
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
            type,
            latitude: type === 'location' ? reduxLocation.coords.latitude : ' ',
            longitude: type === 'location' ? reduxLocation.coords.longitude : ' ',
          },
        ],
      });
    }
  }, [text, count]);

  // TODO learn to cache already sent messages.
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

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetch = async () => {
    const docSnap = await getDoc(docRef);
    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) docRef = docRef2;
    if (docSnap.exists()) {
      onSnapshot(docRef, (messsagesSnapshot) => {
        const messages = [];
        messsagesSnapshot.data().message.forEach((message) => {
          messages.push(message);
        });
        setMessagesList(messages);
      });
    }
  };

  const memoDep = messagesList[-1];

  const renderMessages = ({ item }) => <MessageBox messages={item} />;

  const memoizedRender = useMemo(() => renderMessages, [memoDep]);

  const [visible, setVisible] = useState();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      showDialog();
    }

    const locationData = await Location.getCurrentPositionAsync({});

    locationData.coords.latitude
      ? dispatch(saveLocation(locationData))
      : Alert.alert('Try again, please.');
  };

  const handleShareLocation = async () => {
    setText('send Iocation...');
    await updateDatabase();
  };

  const flashListRef = useRef(null);

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              You&apos;ve denied location access! To continue, Please grant acces from setting.
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
              // disabled={location}
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {
                handleShareLocation();
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
      <FlatList
        data={messagesList}
        renderItem={memoizedRender}
        estimatedItemSize={100}
        ref={flashListRef}
        onContentSizeChange={() => flashListRef.current.scrollToEnd()}
      />
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
            setCount(count + 1);
          }}
        />
      </View>
    </View>
  );
}

export default ChatScreen;
