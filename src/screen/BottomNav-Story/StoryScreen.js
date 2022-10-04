/* eslint-disable func-names */

/* eslint-disable no-return-await */
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

import { db, storage } from '../../utils/firebase';

function StoryScreen() {
  const { colors } = useTheme();

  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.user.value);

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

  const pickLibraryImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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

  const handleUpload = async () => {
    const photoURL = await uploadImageAsync(image);
    const docRef = doc(db, 'story', user.id);
    await updateDoc(docRef, {
      photoURL,
    });
  };

  return (
    <View>
      <IconButton
        icon="plus"
        mode="outlined"
        iconColor={colors.secondary}
        size={20}
        onPress={() => pickCameraImage()}
      />
      <Text>StoryScreen</Text>
    </View>
  );
}

export default StoryScreen;
