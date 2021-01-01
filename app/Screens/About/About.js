import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../../theme/Colors';

export default function About() {
  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
      }}>
      <Text style={{color: Colors.light}}>Settings Goes here</Text>
    </View>
  );
}
