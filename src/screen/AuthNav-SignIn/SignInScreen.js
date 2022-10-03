import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import SignButton from '../../component/Button/SignButton';
import CustomAlert from '../../component/CustomAlert/CustomAlert';
import Input from '../../component/Input';
import { signIn } from '../../redux/slice/userSlice';
import { auth, db } from '../../utils/firebase';
import styles from './SignInScreen.style';

function SignIn() {
  const { colors } = useTheme();

  const user = useSelector((state) => state.user.value);

  const [secureText, setSecureText] = useState(true);

  const [userPassword, setUserPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [userMail, setUserMail] = useState(null);

  const [showPasswordReset, setshowPasswordReset] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  let count = 0;
  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, userMail, userPassword)
      .then(async (response) => {
        const userDoc = doc(db, 'user', response.user.uid);
        const userRef = await getDoc(userDoc);
        if (userRef.exists()) {
          dispatch(signIn(userRef.data()));
        }
        if (username !== user.username) return Alert.alert('Wrong Username.');
        return navigation.navigate('ContactStack');
      })
      .catch((e) => {
        switch (e.message) {
          case 'Firebase: Error (auth/user-not-found).':
            Alert.alert('E mail not found.');
            break;
          case 'Firebase: Error (auth/wrong-password).':
            count += 1;
            if (count < 3) Alert.alert('Wrong Password.');
            if (count >= 3) Alert.alert('Do you want to reset your password?');
            break;
          default:
            Alert.alert('Something went wrong during authentication.');
            break;
        }
      });
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
        <Input
          label="Type your username"
          placeholder="username"
          onChangeText={setUsername}
          right={<TextInput.Icon icon="account" />}
        />
        <Input
          label="Type your Email"
          placeholder="Email"
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
