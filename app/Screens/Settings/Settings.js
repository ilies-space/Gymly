import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback} from '../../../theme/Icons';
import {useDispatch} from 'react-redux';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
          Settings
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: '4%'}}>
        <View style={{paddingVertical: 20}} />

        <Button
          title={'ERACE AL DATA'}
          onPress={() => {
            Alert.alert(
              'worning',
              "this action will delete all your member and can't be returned after this action !!",
              [
                {
                  text: 'Confirme',
                  onPress: () => {
                    dispatch({
                      type: 'EraceAllData',
                    });
                  },
                },
              ],
            );
          }}
        />
        <Button title={'Chage gym name'} />
        <View style={{paddingVertical: 20}} />
        <Button title={'set a password'} />
        <View style={{paddingVertical: 20}} />
        <Button title={'Change language'} />
        <View style={{paddingVertical: 20}} />
        <Button title={'extract databse exel'} />
      </ScrollView>
    </View>
  );
}
