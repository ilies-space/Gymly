import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback} from '../../../theme/Icons';

export default function Notifications() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
        // padding: '4%',
      }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          padding: '3%',
          borderBottomWidth: 0.5,
          borderColor: Colors.dark,
          elevation: 3,
          margin: '1%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          {goback}
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.light,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            justifyContent: 'center',
            marginRight: 25,
            paddingTop: 1,
          }}>
          Notifications
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: '4%'}}>
        <Text style={{color: Colors.light}}>You have no notification .</Text>
      </ScrollView>
    </View>
  );
}
