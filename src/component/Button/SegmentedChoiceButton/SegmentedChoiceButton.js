import React, { useState } from 'react';
import { SegmentedButtons, useTheme } from 'react-native-paper';

import styles from './SegmentedChoiceButton.style';

function SegmentedChoiceButton({ onPressCamera, onPressGalery }) {
  const [value, setValue] = useState('');
  const { colors } = useTheme();

  return (
    <SegmentedButtons
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: 'camera',
          icon: 'camera',
          label: 'Camera',
          onPress: onPressCamera,
        },
        {
          value: 'gallery',
          icon: 'panorama-variant-outline',
          label: 'Gallery',
          onPress: onPressGalery,
        },
      ]}
      style={[styles.group, { backgroundColor: colors.secondary }]}
    />
  );
}

export default SegmentedChoiceButton;
