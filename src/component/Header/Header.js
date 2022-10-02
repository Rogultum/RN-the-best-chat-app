import React, { useState } from 'react';
import { Appbar, Menu, useTheme } from 'react-native-paper';

function Header({ navigation, back }) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { colors } = useTheme();
  // const { itemId } = route.params;
  // console.log(route.params);
  // console.log(route);

  return (
    <Appbar.Header elevated style={{ backgroundColor: colors.primary, color: 'red' }}>
      {back.title !== 'SignIn' ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={back.title !== 'SignIn' ? 'Chat' : 'the-best-chat-app'} />
      {!back.title !== 'SignIn' ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" color={colors.tertiary} onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
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
