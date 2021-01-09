import React from 'react';
import {View, Text, Button, Share, Linking} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback} from '../../../theme/Icons';

export default function About() {
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: 'https://github.com/ilies-space',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('shared with activity type of ' + result.activityType);
        } else {
          // shared
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
          About
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: '4%', paddingTop: 20}}>
        <Text style={{color: Colors.light, fontWeight: 'bold'}}>
          Gymly V 1.0.0
        </Text>
        <View style={{paddingVertical: 5}} />

        <Text style={{color: Colors.light}}>
          Gymly is offline and free solution to manage your Gym clients
          membership{' '}
        </Text>

        <View style={{paddingVertical: 20}} />

        <Text style={{color: Colors.light, fontWeight: 'bold'}}>
          Privacy policy
        </Text>
        <View style={{paddingVertical: 5}} />

        <Text style={{color: Colors.light}}>
          All your data been saved locally on your phone , 100% offline no one
          will have access or collect your data in any way .
        </Text>
        <View style={{paddingVertical: 20}} />

        <Button
          title={'Rate the app'}
          onPress={() => {
            Linking.openURL('https://github.com/ilies-space');
          }}
        />
        <View style={{paddingVertical: 20}} />
        <Button title={'Share the app'} onPress={onShare} />
      </ScrollView>
    </View>
  );
}
