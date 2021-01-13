import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback} from '../../../theme/Icons';
import {useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import {Picker} from '@react-native-picker/picker';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Language, setLanguage] = useState('EN');

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
          Settings
        </Text>
      </View>

      <ScrollView style={{paddingHorizontal: '4%'}}>
        <View style={{alignItems: 'center'}}>
          <LottieView
            source={require('../../../assets/setting.json')}
            autoPlay
            loop
            style={{
              height: 120,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={{color: Colors.light, fontWeight: 'bold'}}>
            Change Gym name :
          </Text>
        </View>
        <TextInput
          onSubmitEditing={(name) => {
            dispatch({
              type: 'setGymName',
              gymName: name.nativeEvent.text,
            });
            navigation.goBack();
          }}
          placeholderTextColor={Colors.lightGrey}
          style={{
            flex: 3,
            borderColor: Colors.main,
            borderWidth: 0.5,
            color: Colors.light,
            textAlign: 'center',
          }}
        />
        <View style={{paddingVertical: 20}} />

        <Text
          style={{
            color: Colors.lightGrey,
            margin: '4%',
          }}>
          EXTRA OPTIONS :
        </Text>

        <View
          style={{
            backgroundColor: Colors.grey,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 50,
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'worning',
                "this action will delete all your member and can't be returned after this action !!",
                [
                  {
                    text: 'cancel',
                  },
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
            }}>
            <Text style={{color: Colors.red}}>ERACE ALL DATA</Text>
          </TouchableOpacity>

          <View style={{paddingVertical: 20}} />
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'wornnig',
                'this action will lock your application and you need to enter the ipn code to unlock it next time',
                [
                  {
                    text: 'cancel',
                  },
                  {
                    text: 'Confirme',
                    onPress: () => {
                      dispatch({
                        type: 'lock',
                      });
                    },
                  },
                ],
              );
            }}>
            <Text style={{color: Colors.lightGrey}}>Lock the app </Text>
          </TouchableOpacity>

          <View style={{paddingVertical: 20}} />

          <TextInput
            onSubmitEditing={(name) => {
              dispatch({
                type: 'changePin',
                newPin: name.nativeEvent.text,
              });
              alert('new password has been set succesfully');
              navigation.goBack();
            }}
            placeholderTextColor={Colors.lightGrey}
            style={{
              flex: 3,
              borderColor: Colors.main,
              borderWidth: 0.5,
              color: Colors.light,
              textAlign: 'center',
              width: '100%',
            }}
            placeholder={'new pin code'}
          />

          <View style={{paddingVertical: 20}} />

          <TouchableOpacity
            onPress={() => {
              alert(
                'this feuture will be availible on the upcoming version of gymly , contact me at ilyasdzair1@gmail.com from more info .',
              );
            }}>
            <Text style={{color: Colors.lightGrey}}>Change language</Text>
          </TouchableOpacity>
          <View style={{paddingVertical: 20}} />

          <TouchableOpacity
            onPress={() => {
              alert(
                'this feuture will be availible on the upcoming version of gymly , contact me at ilyasdzair1@gmail.com from more info .',
              );
            }}>
            <Text style={{color: Colors.lightGrey}}>
              extract all your data in exel format
            </Text>
          </TouchableOpacity>
          <View style={{paddingVertical: 20}} />

          <View style={{alignSelf: 'flex-start'}}>
            <Text
              style={{
                color: Colors.lightGrey,
              }}>
              Choose your language
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Picker
              style={{color: Colors.light}}
              dropdownIconColor={Colors.light}
              mode={'dropdown'}
              selectedValue={Language}
              onValueChange={(itemValue) => {
                alert(
                  'this feuture is not avalibale yet , Only English for now ..  ',
                );
                setLanguage(itemValue);
                dispatch({
                  type: 'changeLanguage',
                  selectedLanguage: itemValue,
                });
              }}>
              <Picker.Item label="English" value="EN" />
              <Picker.Item label="العربية" value="AR" />
              <Picker.Item label="francais" value="FR" />
            </Picker>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: Colors.grey,
            marginVertical: 10,
            padding: 10,
          }}>
          <Text style={{color: Colors.lightGrey}}>
            GYMLY by ilies ouldmenouer
          </Text>
          <Text style={{color: Colors.light}}>V 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
