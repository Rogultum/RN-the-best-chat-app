import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { FlashList } from '@shopify/flash-list';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';

import MessageBox from '../../component/MessageBox/MessageBox';
import { db } from '../../utils/firebase';
import styles from './ChatScreen.style';

function ChatScreen({ route }) {
  const user = useSelector((state) => state.user.value);

  const [messagesList, setMessagesList] = useState([]);

  const [text, setText] = useState();

  const { receiverId } = route.params;

  const roomId = user.id + receiverId;

  const createChatRoom = async () => {
    const docRef = doc(db, 'chatroom', roomId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        message: arrayUnion({
          senderId: user.id,
          receiverId,
          text,
        }),
      });
    } else {
      await setDoc(doc(db, 'chatroom', roomId), {
        users: [user.id, receiverId],
        message: {
          senderId: user.id,
          receiverId,
          text,
        },
      });
    }
  };

  const fetchMessages = async () => {
    const docRef = doc(db, 'chatroom', roomId);
    const docSnap = await getDoc(docRef);
    // console.log('docsnap', docSnap.data().message);
    const messages = [];
    // Object.entries(docSnap.data().message).forEach((message) => {
    //   messages.push(message);
    // });
    docSnap.data().message.forEach((message) => {
      messages.push(message);
    });
    console.log(messages);
    setMessagesList(messages);
    // console.log('list', messagesList);
    // const contacts = [];
    // docSnap.forEach((contact) => {
    //   contacts.push(contact.data());
    // });
    // dispatch(getContacts([...contacts]));
  };

  const renderMessages = ({ item }) => <MessageBox messages={item} />;

  return (
    <View style={styles.container}>
      <Text onPress={fetchMessages}>{receiverId}</Text>
      <FlashList data={messagesList} renderItem={renderMessages} estimatedItemSize={100} />
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          left={<TextInput.Icon icon="emoticon-outline" />}
          right={<TextInput.Icon icon="paperclip" />}
          mode="outlined"
          theme={{ roundness: 50 }}
          onChangeText={setText}
        />
        <Icon style={styles.icon} name="send" size={40} onPress={() => createChatRoom()} />
      </View>
    </View>
  );
}

export default ChatScreen;
