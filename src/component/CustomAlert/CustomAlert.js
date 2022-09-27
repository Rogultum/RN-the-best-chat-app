import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

function CustomAlert({ visible, onDismiss, dialog }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{dialog}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default CustomAlert;
