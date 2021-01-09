import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';

export default function Auth() {
  const dispatch = useDispatch();

  return (
    <View
      style={{flex: 1, backgroundColor: Colors.dark, justifyContent: 'center'}}>
      <View style={{}}>
        {/* <Image
          style={{height: 200, width: '100%'}}
          source={require('../../assets/redCar.jpg')}
        /> */}

        <View
          style={{
            height: 200,
            alignItems: 'center',
            backgroundColor: Colors.dark,
          }}>
          <LottieView
            source={require('../../../assets/lockcloud.json')}
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: Colors.grey,
          }}>
          <Text style={{color: Colors.light}}>ENTER SECURITY PIN </Text>
        </View>
      </View>

      <View>
        <TextInput
          onChangeText={(v) => {}}
          keyboardType={'number-pad'}
          keyboardAppearance={'dark'}
          autoFocus={true}
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGrey,
            borderRadius: 20,
            padding: 20,
            margin: 20,
            color: 'white',
          }}
          secureTextEntry
          placeholder={'default pin : 0000'}
          placeholderTextColor={'white'}
          onSubmitEditing={(input) => {
            dispatch({
              type: 'login',
              codePin: input.nativeEvent.text,
            });
          }}
        />
      </View>
    </View>
  );
}
