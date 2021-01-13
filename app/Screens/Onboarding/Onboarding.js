import React from 'react';
import {View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function OnboardingScreens() {
  //   const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Onboarding
        onSkip={() => {
          console.log('DONE');
          //   navigation.navigate('AuthNavigationNavigation');
        }}
        onDone={() => {
          console.log('DONE');
          //   navigation.navigate('AuthNavigationNavigation');
        }}
        pages={[
          {
            backgroundColor: '#000',
            image: <FontAwesome5 name="store" size={100} color="#fff" />,
            title: 'Gymly',
            subtitle:
              'Laborum enim duis enim sunt non dolore consectetur ad exercitation eiusmod aute cupidatat ut. ! ',
          },
          {
            backgroundColor: '#000',
            image: <FontAwesome5 name="luggage-cart" size={100} color="#fff" />,
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
