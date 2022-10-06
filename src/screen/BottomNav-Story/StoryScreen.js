/* eslint-disable no-unused-vars */

/* eslint-disable func-names */

/* eslint-disable no-return-await */
import React, { useState } from 'react';
import { Alert, Text, View, useWindowDimensions } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

import ShowStory from '../../component/ShowStory';
import { db, storage } from '../../utils/firebase';
import styles from './StoryScreen.style';

function StoryScreen() {
  const { colors } = useTheme();

  const [image, setImage] = useState(null);
  const [storyList, setStoryList] = useState([]);

  const user = useSelector((state) => state.user.value);

  const renderComp = (item) => <ShowStory images={item} />;

  const { height, width } = useWindowDimensions();

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
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

  const pickLibraryImage = async () => {
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

  const handleUpload = async () => {
    const photoURL = await uploadImageAsync(image);
    const docRef = doc(db, 'story', user.id);
    await updateDoc(docRef, {
      photo: arrayUnion({
        photoURL,
        date: Date.now(),
      }),
    });
  };

  async function fetchStories() {
    const colRef = collection(db, 'story');
    const colSnap = await getDocs(colRef);

    const stories = [];

    // Object.entries(colSnap.data().photo).forEach((photo) => {
    //   stories.push(photo);
    // });

    colSnap.forEach((story) => {
      stories.push(story.data().photo);
    });
    // colSnap.data().photo.forEach((photoURL) => {
    //   stories.push(photoURL);
    // });
    setStoryList([...stories]);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <View style={styles.inner_container}>
          <IconButton
            icon="plus"
            mode="outlined"
            iconColor={colors.secondary}
            size={20}
            onPress={() => pickLibraryImage()}
          />
          <Text>StoryScreen</Text>
          <IconButton
            icon="plus"
            mode="outlined"
            iconColor={colors.secondary}
            size={20}
            onPress={() => handleUpload()}
          />
          <IconButton
            icon="plus"
            mode="outlined"
            iconColor={colors.secondary}
            size={20}
            onPress={() => fetchStories()}
          />
        </View>
        <Carousel
          loop
          width={width}
          height={height}
          autoPlay={false}
          data={storyList}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={renderComp}
        />
      </View>
    </GestureHandlerRootView>
  );
}

export default StoryScreen;
