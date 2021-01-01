import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../../theme/Colors';

export default function Members() {
  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
      }}>
      <Text style={{color: Colors.light}}>Members Goes here</Text>
    </View>
  );
}
