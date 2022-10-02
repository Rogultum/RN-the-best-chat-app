import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

import styles from './Input.style';

function Input({
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
  value,
  onFocus,
  onBlur,
  right,
  left,
  mode,
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, { color: colors.tertiary }]}>{label}</Text>
      <View style={[styles.input_container, { borderColor: colors.secondary }]}>
        <TextInput
          value={value}
          style={[styles.text_input, { backgroundColor: colors.primary }]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          right={right}
          left={left}
          mode={mode}
        />
      </View>
    </View>
  );
}

export default Input;
