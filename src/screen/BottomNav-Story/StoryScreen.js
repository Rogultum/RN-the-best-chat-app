/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */

/* eslint-disable func-names */

/* eslint-disable no-return-await */
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Modal, Pressable, View, useWindowDimensions } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
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

  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);

  const { height, width } = useWindowDimensions();

  const renderComp = (item) => <ShowStory images={item} />;

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

  const handleUpload = useCallback(async () => {
    const photoURL = await uploadImageAsync(image);
    const docRef = doc(db, 'story', user.id);
    const now = Date.now().toString();
    await setDoc(doc(db, 'story', now), {
      id: user.id,
      username: user.username,
      userPhotoURL: '',
      date: Date.now(),
      photoURL,
    });
  }, [pickCameraImage, pickLibraryImage]);

  async function fetchStories() {
    const now = Date.now();
    const q = query(
      collection(db, 'story'),
      where('date', '>', now - 86400000),
      orderBy('date'),
      orderBy('id')
    );
    const colSnap = await getDocs(q);
    const stories = [];
    colSnap.forEach((story) => {
      stories.push(story.data());
    });
    setStoryList([...stories]);
  }

  const link = 'https://type.fit/api/quotes';
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();

  function fetchQuote() {
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        const randomQuoteIndex = Math.round(Math.random() * data.length);
        setQuote(data[randomQuoteIndex].text);
        setAuthor(data[randomQuoteIndex].author);
      });
  }

  useEffect(() => {
    fetchStories();
  }, [handleUpload]);

  useEffect(() => {
    fetchQuote();
    fetchStories();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <View style={styles.story_container}>
          <IconButton
            style={styles.story_button}
            icon="plus"
            mode="outlined"
            iconColor={colors.secondary}
            size={20}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View style={styles.quote_container}>
            <Text
              style={[styles.quote_text, { color: colors.tertiary }]}
              onPress={() => fetchQuote()}
            >
              &quot;{quote}&quot;{'    -'}
              {author}
            </Text>
          </View>
        </View>
        <Text style={[styles.story_text, { color: colors.tertiary }]}>Your Story!</Text>
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
              <View style={styles.selection_button}>
                <IconButton
                  icon="camera-outline"
                  mode="outlined"
                  iconColor={colors.tertiary}
                  size={20}
                  onPress={() => pickCameraImage()}
                />
                <IconButton
                  icon="image-multiple-outline"
                  mode="outlined"
                  iconColor={colors.tertiary}
                  size={20}
                  onPress={() => pickLibraryImage()}
                />
              </View>
              <Text style={[styles.modalText, { color: colors.tertiary }]}>Pick your Image!</Text>
              <Pressable
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => {
                  handleUpload();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={[styles.textStyle, { color: colors.tertiary }]}>Save Story</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Carousel
          loop
          width={width}
          height={height}
          autoPlay={false}
          data={storyList}
          scrollAnimationDuration={1000}
          // onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={renderComp}
        />
      </View>
    </GestureHandlerRootView>
  );
}

export default StoryScreen;
