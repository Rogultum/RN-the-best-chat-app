import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';

import SignButton from '../../component/Button/SignButton';
import CustomAlert from '../../component/CustomAlert/CustomAlert';
import Input from '../../component/Input';
import { signIn } from '../../redux/slice/userSlice';
import { auth, db } from '../../utils/firebase';
import styles from './SignInScreen.style';

function SignIn() {
  const { colors } = useTheme();

  const [userPassword, setUserPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [userMail, setUserMail] = useState(null);

  const [showPasswordReset, setshowPasswordReset] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  let count = 0;
  const handleSignIn = async () => {
    const userData = await AsyncStorage.getItem('user');
    const user = JSON.parse(userData);
    if (user.username !== username) {
      return Alert.alert('Username not found!');
    }
    if (user.email !== userMail) {
      return Alert.alert('E-mail not found!');
    }
    if (user.password !== userPassword) {
      count += 1;
      if (count >= 3) {
        // TODO navigation
        setshowPasswordReset(true);
      } else if (count < 3) return Alert.alert('Wrong password');
    }

    signInWithEmailAndPassword(auth, userMail, userPassword).then(async (response) => {
      const userDoc = doc(db, 'user', response.user.uid);
      const userRef = await getDoc(userDoc);
      if (userRef.exists()) {
        dispatch(signIn(userRef.data()));
      }
    });

    if (user.username === username && user.password === userPassword)
      return navigation.navigate('ContactStack');

    return null;
  };

  const navigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomAlert
        dialog="Do you want to reset your password?"
        visible={showPasswordReset}
        onDismiss={() => setshowPasswordReset(false)}
      />
      <ScrollView>
        <Input label="Type your username" placeholder="username" onChangeText={setUsername} />
        <Input label="Type your Email" placeholder="Email" onChangeText={setUserMail} />
        <Input
          label="Type your password"
          secureTextEntry
          placeholder="*****"
          onChangeText={setUserPassword}
        />
        <Pressable onPress={navigateSignUp} style={styles.question_container}>
          <Text style={{ color: colors.secondary }}>Don&apos;t have an account?</Text>
        </Pressable>
      </ScrollView>
      <SignButton
        title="Sign In"
        onPress={handleSignIn}
        accessibilityLabel="Button writes Sign In"
      />
    </SafeAreaView>
  );
}

export default SignIn;
