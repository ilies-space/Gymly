import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import Colors from '../../../theme/Colors';
import {useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

export default function OnboardingScreens() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Language, setLanguage] = useState('EN');
  return (
    <View style={{flex: 1}}>
      {/* Select LAnguage  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: Colors.main,
        }}>
        <View style={{flex: 2}}>
          <Text>Choose your language</Text>
        </View>
        <View style={{flex: 1}}>
          <Picker
            style={{color: Colors.dark}}
            dropdownIconColor={Colors.dark}
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
      <Onboarding
        onSkip={() => {
          console.log('DONE');
          navigation.navigate('DrawerNavigation');
          dispatch({
            type: 'disableOnBoarding',
          });
        }}
        onDone={() => {
          console.log('DONE');
          navigation.navigate('DrawerNavigation');
          dispatch({
            type: 'disableOnBoarding',
          });
        }}
        pages={[
          {
            backgroundColor: '#000',
            image: <AntDesign name="table" size={100} color={Colors.main} />,
            title: 'Gymly',
            subtitle:
              'Laborum enim duis enim sunt non dolore consectetur ad exercitation eiusmod aute cupidatat ut. ! ',
          },
          {
            backgroundColor: '#000',
            image: (
              <MaterialIcons name="timeline" size={100} color={Colors.main} />
            ),
            title: 'Gymly',
            subtitle:
              'Consectetur ut exercitation dolore proident consectetur occaecat qui ipsum irure magna anim. Ad do pariatur veniam sint cupidatat labore ea aliquip sint quis aliqua deserunt dolore mollit. Eiusmod officia laboris cillum tempor eu ipsum cupidatat est ea labore. Elit dolore sit magna adipisicing aliqua ipsum consequat quis. Cupidatat sint nostrud magna ad mollit eu amet ullamco. Veniam labore non exercitation magna sit enim quis excepteur id ex ex enim voluptate. Velit incididunt ea mollit elit est do elit occaecat duis reprehenderit.',
          },
          {
            backgroundColor: '#000',
            image: (
              <MaterialIcons name="notifications" size={100} color="#fff" />
            ),
            title: 'Gymly',
            subtitle:
              'Nostrud magna Lorem nulla amet aliquip duis amet anim amet.',
          },
        ]}
      />
    </View>
  );
}
