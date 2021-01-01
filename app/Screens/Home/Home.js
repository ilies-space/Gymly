import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../../theme/Colors';

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
      }}>
      <Text>HOME SC</Text>
    </View>
  );
}
