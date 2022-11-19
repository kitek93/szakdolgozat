import React, {FC} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const CustomButton: FC<{
  onPress(): void;
  buttonStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  title: string;
}> = ({onPress, buttonStyle, textStyle, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          height: 60,
          width: 232,
          padding: 8,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 6,
          zIndex: 1,
        },
        buttonStyle,
      ]}>
      <Text style={[textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
