import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Appbar, Menu, useTheme } from 'react-native-paper';

function Header({ navigation, back }) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { colors } = useTheme();

  return (
    <Appbar.Header elevated style={{ backgroundColor: colors.primary, color: 'red' }}>
      {back.title !== 'SignIn' ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={back.title !== 'SignIn' ? '{ title }' : 'the-best-chat-app'} />
      {!back.title !== 'SignIn' ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="cat" color={colors.tertiary} onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              Alert.alert('Meowww');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default Header;
