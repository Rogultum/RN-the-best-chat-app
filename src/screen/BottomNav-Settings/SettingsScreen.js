/* eslint-disable no-unused-vars */

/* eslint-disable func-names */

/* eslint-disable no-console */

/* eslint-disable no-return-await */
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, View } from 'react-native';
import {
  Avatar,
  Button,
  IconButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import { sendPasswordResetEmail, updateEmail } from 'firebase/auth';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';

import SegmentedChoiceButton from '../../component/Button/SegmentedChoiceButton/SegmentedChoiceButton';
import ListItem from '../../component/ListItem/ListItem';
import { updateUser } from '../../redux/slice/userSlice';
import { auth, db, storage } from '../../utils/firebase';
import styles from './SettingsScreen.style';

function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();

  const { colors } = useTheme();

  const user = useSelector((state) => state.user.value);

  const [visiblePasswordSnackBar, setVisiblePasswordSnackBar] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState();

  const [image, setImage] = useState();

  const [isEditable, setIsEditable] = useState(false);

  const enums = [
    'You should definitely change that 123123',
    'Use the same password everywhere so you never forget it!',
    'Catchy song of this season...',
  ];

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    blob.close();

    return await getDownloadURL(fileRef);
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickCameraImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've denied camera access please go to settings to allow it!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // TODO if promise rejection due to a server error; handle error.
  const handleUpload = async () => {
    const photoURL = await uploadImageAsync(image);
    const docRef = doc(db, 'user', user.id);
    await updateDoc(docRef, {
      photoURL,
    });
    dispatch(updateUser({ photoURL }));
  };

  function sendPasswordResetMail() {
    sendPasswordResetEmail(auth, user.email);
  }

  function handleUpdateEmail() {
    updateEmail(auth.currentUser, text)
      .then(() => {
        Alert.alert('E-Mail changed.');
      })
      .catch((error) => {
        Alert.alert('There was a problem, please sign-out then sign-in and try again.');
      });
  }

  // TODO prevent user to make too many reads on firebase
  async function handleUpdateDoc(texts) {
    const docRef = doc(db, 'user', user.id);
    await updateDoc(docRef, {
      username: texts,
    });
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
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
            <View style={styles.selection_button}>
              <TextInput value={text} onChangeText={setText} />
            </View>
            <Text style={[styles.modalText, { color: colors.tertiary }]}>Change your e-mail.</Text>
            <Pressable
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {
                handleUpdateEmail();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={[styles.textStyle, { color: colors.tertiary }]}>Save E-mail</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Snackbar
        style={{ backgroundColor: colors.tertiary }}
        visible={visibleSnackBar}
        onDismiss={() => setVisibleSnackBar(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setVisibleSnackBar(false);
          },
        }}
      >
        Image Saved!
      </Snackbar>
      <Snackbar
        style={{ backgroundColor: colors.tertiary }}
        visible={visiblePasswordSnackBar}
        onDismiss={() => setVisibleSnackBar(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setVisiblePasswordSnackBar(false);
          },
        }}
      >
        Password reset e-mail sent.
      </Snackbar>
      <Pressable onPress={() => setIsEditable(true)}>
        {!isEditable ? (
          <Text>{user.username}</Text>
        ) : (
          <TextInput
            mode="outlined"
            style={{ width: 80, height: 40, marginBottom: 8 }}
            value={user.username}
            onChangeText={(texts) => {
              setText(texts);
              dispatch(updateUser({ username: texts }));
              handleUpdateDoc(texts);
            }}
            onBlur={() => setIsEditable(false)}
          />
        )}
      </Pressable>
      <Avatar.Image
        style={[styles.image, { backgroundColor: colors.primary }]}
        size={96}
        source={{ uri: user.photoURL ? user.photoURL : image }}
      />
      <View style={styles.upload_text_container}>
        <Text>Upload a Picture with</Text>
      </View>
      <SegmentedChoiceButton onPressGalery={pickImage} onPressCamera={pickCameraImage} />
      <View style={styles.save_button_container}>
        <Button
          textColor={colors.tertiary}
          buttonColor={colors.primary}
          mode="contained"
          disabled={!image}
          onPress={() => {
            handleUpload();
            setVisibleSnackBar(true);
          }}
        >
          Save Image
        </Button>
      </View>

      <View style={styles.list_item_container}>
        <ListItem
          icon="account-convert"
          title="Update E-Mail"
          description="You can change your e-mail here."
          iconSize={37}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <ListItem
          icon="lock-reset"
          title="Reset Password"
          description={enums[Math.floor(Math.random() * enums.length)]}
          iconSize={37}
          onPress={() => {
            sendPasswordResetMail();
            setVisiblePasswordSnackBar(true);
          }}
        />
      </View>

      <View style={styles.theme_button_container}>
        <Button
          buttonColor={colors.secondary}
          textColor={colors.tertiary}
          mode="contained-tonal"
          icon="theme-light-dark"
          contentStyle={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('Theme', { itemId: 1 })}
        >
          Theme
        </Button>
      </View>
    </View>
  );
}

export default SettingsScreen;
