/* eslint-disable import/no-extraneous-dependencies */
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import { Alert, View } from 'react-native';
import { Button, Switch, useTheme } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { changeTheme } from '../../redux/slice/themeSlice';
import styles from './ThemeScreen.style';

function ThemeScreen() {
  const navigation = useNavigation();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(changeTheme());
  };

  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {isSwitchOn && (
        <MaterialCommunityIcons
          style={{ marginLeft: 8, marginBottom: 18 }}
          name="white-balance-sunny"
          color="#FFFC66"
          size={66}
          accessibilityLabel="Shining Sun icon"
        />
      )}
      <Switch
        style={[{ backgroundColor: theme.colors.accent }]}
        color="#EEEE9B"
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
        accessibilityLabel="Switch that can be turned on and off"
      />
      {!isSwitchOn && (
        <MaterialCommunityIcons
          style={{ marginLeft: 2, marginTop: 18 }}
          name="weather-night"
          color="#C0C8CF"
          size={66}
          accessibilityLabel="Moon and Stars icon"
        />
      )}
      <Button
        accessibilityLabel="Text Button writes Done, but looks suspicious."
        labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
        mode="text"
        onPress={() =>
          Alert.alert(
            'Sorry you are trapped here forever',
            'Just kidding, you can press longer to go back.'
          )
        }
        onLongPress={() => navigation.goBack()}
      >
        Done?
      </Button>
    </View>
  );
}

export default ThemeScreen;
