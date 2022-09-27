/* eslint-disable consistent-return */

/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, Text } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import SignButton from '../../component/Button/SignButton';
import Input from '../../component/Input';
import { auth, db } from '../../utils/firebase';
import styles from './SignUpScreen.style';

function SignUp() {
  const navigation = useNavigation();

  const [userMail, setUserMail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userPasswordCheck, setUserPasswordCheck] = useState(null);
  const [username, setUsername] = useState(null);

  // TODO better alert
  const handleSignUp = async () => {
    if (userPassword !== userPasswordCheck) {
      return Alert.alert("Passwords don't match.");
    }
    if (
      userPassword === null ||
      userMail === null ||
      userPasswordCheck === null ||
      username === null
    ) {
      return Alert.alert('Missing Information');
    }

    await AsyncStorage.setItem(
      'user',
      JSON.stringify({
        email: userMail,
        password: userPassword,
        username,
        photoURL: '',
      })
    );

    createUserWithEmailAndPassword(auth, userMail, userPassword).then(async (response) => {
      await setDoc(doc(db, 'user', response.user.uid), {
        id: response.user.uid,
        email: userMail,
        username,
        photoURL: '',
        location: {
          latitude: [],
          longitude: [],
        },
      });
    });

    navigation.navigate('SignIn');
  };

  const navigateSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <Input
          label="Type your e-mail"
          placeholder="example@example.com"
          // value={email}
          onChangeText={setUserMail}
        />
        <Input
          label="Type your password"
          secureTextEntry
          placeholder="*****"
          // value={password}
          onChangeText={setUserPassword}
        />
        <Input
          label="Re-Type your password"
          secureTextEntry
          placeholder="*****"
          onChangeText={setUserPasswordCheck}
        />
        <Input label="Type your username" placeholder="username" onChangeText={setUsername} />
        <Pressable onPress={navigateSignIn} style={styles.question_container}>
          <Text style={styles.question_text}>Already have an account?</Text>
        </Pressable>
      </ScrollView>
      <SignButton title="Sign Up" onPress={handleSignUp} />
    </SafeAreaView>
  );
}

export default SignUp;
