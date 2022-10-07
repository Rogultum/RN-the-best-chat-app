/* eslint-disable consistent-return */

/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import SignButton from '../../component/Button/SignButton';
import Input from '../../component/Input';
import { auth, db } from '../../utils/firebase';
import styles from './SignUpScreen.style';

function SignUp() {
  const navigation = useNavigation();

  const { colors } = useTheme();

  const [secureText, setSecureText] = useState(true);

  const [userMail, setUserMail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userPasswordCheck, setUserPasswordCheck] = useState(null);
  const [username, setUsername] = useState(null);

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

    createUserWithEmailAndPassword(auth, userMail, userPassword).then(async (response) => {
      await setDoc(doc(db, 'user', response.user.uid), {
        id: response.user.uid,
        email: userMail,
        username,
        photoURL: '',
      });
      await AsyncStorage.setItem(
        response.user.uid,
        JSON.stringify({
          email: userMail,
          password: userPassword,
          username,
          photoURL: '',
        })
      );
    });

    navigation.navigate('SignIn');
  };

  const navigateSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <Input
          label="Type your e-mail"
          placeholder="example@example.com"
          onChangeText={setUserMail}
          right={<TextInput.Icon icon="at" />}
        />
        <Input
          label="Type your password"
          secureTextEntry={secureText}
          placeholder="*****"
          onChangeText={setUserPassword}
          right={
            <TextInput.Icon
              onPress={() => setSecureText(!secureText)}
              icon={secureText ? 'eye' : 'eye-outline'}
            />
          }
        />
        <Input
          label="Re-Type your password"
          secureTextEntry={secureText}
          placeholder="*****"
          onChangeText={setUserPasswordCheck}
          right={
            <TextInput.Icon
              onPress={() => setSecureText(!secureText)}
              icon={secureText ? 'eye' : 'eye-outline'}
            />
          }
        />
        <Input
          label="Type your username"
          placeholder="username"
          onChangeText={setUsername}
          right={<TextInput.Icon icon="account-outline" />}
        />
        <Pressable onPress={navigateSignIn} style={styles.question_container}>
          <Text style={{ color: colors.secondary }}>Already have an account?</Text>
        </Pressable>
      </View>
      <SignButton
        title="Sign Up"
        onPress={handleSignUp}
        accessibilityLabel="Button writes Sign Up"
      />
    </SafeAreaView>
  );
}

export default SignUp;
