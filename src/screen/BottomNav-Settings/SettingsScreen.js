/* eslint-disable no-unused-vars */

/* eslint-disable func-names */

/* eslint-disable no-console */

/* eslint-disable no-return-await */
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Avatar, Button, Dialog, Paragraph, Portal, Text, useTheme } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';

import SegmentedChoiceButton from '../../component/Button/SegmentedChoiceButton/SegmentedChoiceButton';
import { updateUser } from '../../redux/slice/userSlice';
import { db, storage } from '../../utils/firebase';
import styles from './SettingsScreen.style';

function SettingsScreen({ navigation }) {
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  // console.log(user);

  const [image, setImage] = useState();

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

    // We're done with the blob, close and release it
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
    dispatch(updateUser(photoURL));
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        style={[styles.image, { backgroundColor: colors.primary }]}
        size={96}
        source={{ uri: image }}
      />
      <View style={styles.upload_text_container}>
        <Text>Upload a Picture with</Text>
      </View>
      <SegmentedChoiceButton onPressGalery={pickImage} onPressCamera={pickCameraImage} />
      <View style={styles.save_button_container}>
        <Button
          buttonColor={colors.primary}
          mode="contained"
          disabled={!image}
          onPress={handleUpload}
        >
          Save Image
        </Button>
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
