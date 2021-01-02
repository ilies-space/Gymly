import React from 'react';
import {View, Text, Button} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback} from '../../../theme/Icons';

export default function About() {
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
          About
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: '4%'}}>
        <Text style={{color: Colors.light}}>Ap descriptio</Text>
        <View style={{paddingVertical: 20}} />

        <Text style={{color: Colors.light}}>
          Dolore ea elit esse veniam mollit ut eu nostrud velit quis dolor ad
          sit. Et do culpa irure magna voluptate quis in. Aliqua duis sit
          excepteur nisi excepteur adipisicing dolor do. Proident duis eu id ex
          nisi esse enim qui sit ut mollit. Voluptate Lorem in qui laboris
          veniam Lorem minim ullamco magna sint elit ipsum eu aute. Elit dolore
          excepteur cillum deserunt ad enim ex voluptate irure pariatur. Nostrud
          dolore commodo sunt veniam incididunt et consequat officia esse magna
          qui exercitation eu. Id id excepteur ipsum magna anim est pariatur
          ipsum aute duis esse sint aliqua. Aute voluptate irure et magna
          pariatur ex. Mollit dolore Lorem excepteur aliquip occaecat labore
          fugiat velit eu velit. Qui anim commodo velit amet dolore sunt
          deserunt et sit. Aliqua incididunt exercitation esse dolor ex Lorem ex
          laboris. Do pariatur laboris aute aliqua.
        </Text>

        <View style={{paddingVertical: 20}} />
        <View style={{paddingVertical: 20}} />

        <Text style={{color: Colors.light}}>Privacy policy</Text>
        <View style={{paddingVertical: 20}} />

        <Text style={{color: Colors.light}}>
          Dolore ea elit esse veniam mollit ut eu nostrud velit quis dolor ad
          sit. Et do culpa irure magna voluptate quis in. Aliqua duis sit
        </Text>
        <View style={{paddingVertical: 20}} />

        <Button title={'Rate the app'} />
        <View style={{paddingVertical: 20}} />
        <Button title={'Share the app'} />
      </ScrollView>
    </View>
  );
}
