import React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

function CustomAlert({ alert, visible, onYes, onDismiss, dialog }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{alert}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{dialog}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>No</Button>
          <Button onPress={onYes}>Yes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default CustomAlert;
