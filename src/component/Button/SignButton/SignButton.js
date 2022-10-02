import React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import styles from './SignButton.style';

function SignButton({ title, onPress, accessibilityLabel }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Button
        buttonColor={colors.primary}
        textColor={colors.tertiary}
        mode="contained"
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
      >
        {title}
      </Button>
    </View>
  );
}

export default SignButton;
