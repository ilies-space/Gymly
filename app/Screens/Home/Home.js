import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {menu, myIcon, notifications} from '../../../theme/Icons';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
      }}>
      {/* Header */}
      <View style={{flexDirection: 'row', margin: '2%'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          {menu}
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.light,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
          }}>
          GymName
        </Text>
        <View>{notifications}</View>
      </View>
      <Text style={{color: Colors.light}}>Newes memebers</Text>
      <Text style={{color: Colors.light}}>Horizontale list goes here</Text>
    </View>
  );
}
