import React from 'react';
import {View, Text} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback} from '../../../theme/Icons';
import LottieView from 'lottie-react-native';

export default function Statistics() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
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
          Statistics
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: '4%'}}>
        <View
          style={{
            height: 200,
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../../assets/charts.json')}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            marginVertical: 20,
          }}>
          <Text style={{color: Colors.light}}>
            This feauture wil be availble on the upcoming version{' '}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
