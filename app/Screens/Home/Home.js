import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {menu, myIcon, notifications} from '../../../theme/Icons';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: Colors.grey,
        flex: 1,
      }}>
      {/* Header */}
      <View style={{flexDirection: 'row', margin: '4%'}}>
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

      {/* Main view  */}
      <ScrollView>
        <View style={{flex: 1}}>
          {/* Total members Card */}
          <View
            style={{
              backgroundColor: Colors.dark,
              borderRadius: 12,
              padding: '5%',
              margin: '4%',
            }}>
            <View>
              <Text style={{color: Colors.light}}>All subscribers</Text>
              <View
                style={{
                  // margin: '4%',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 40,
                    paddingRight: 4,
                    color: Colors.light,
                  }}>
                  20
                </Text>
                {/* <Text style={{color: Colors.light, fontSize: 10}}>members</Text> */}
              </View>
            </View>

            {/* <View>
              <Text style={{color: Colors.light}}>TEXT 2</Text>
              <Text style={{color: Colors.light}}>TEXT 3</Text>
            </View> */}
          </View>

          {/* CARD view */}

          <View>
            <Text style={{color: Colors.light, margin: '4%'}}>
              Recently subscribed
            </Text>
          </View>

          <FlatList
            horizontal
            data={[
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'xx',
              },
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'xxxxx',
              },
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'xxx',
              },
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'xxxzaxx',
              },
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'xxddxxx',
              },
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'da',
              },
              {
                name: 'ilies',
                img: 'img',
                duration: '30',
                memebershipType: 'days',
                id: 'xxxakzxx',
              },
            ]}
            key={(item) => item.id}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: 'white',
                    marginHorizontal: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text> {item.name} </Text>
                  <Text> {item.duration} </Text>
                  <Text> {item.memebershipType} </Text>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
