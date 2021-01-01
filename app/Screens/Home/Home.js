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
import {memebersList} from '../../../temps/data';
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

          {/* CARD  recently view */}

          <View>
            <Text style={{color: Colors.light, margin: '4%'}}>
              Recently subscribed
            </Text>
          </View>

          {memebersList && memebersList.length > 0 ? (
            <FlatList
              horizontal
              data={memebersList}
              key={(item) => item.id}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      backgroundColor: Colors.dark,
                      marginHorizontal: 10,
                      borderRadius: 10,
                      padding: 10,
                      justifyContent: 'center',
                      paddingHorizontal: 20,
                      width: 150,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          backgroundColor: Colors.main,
                          borderRadius: 80 / 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text> {item.img} </Text>
                      </View>
                    </View>

                    <View style={{alignItems: 'center', marginVertical: 10}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: Colors.light,
                        }}>
                        {item.name.length > 10
                          ? item.name.substring(0, 10) + '...'
                          : item.name}
                      </Text>
                      <Text style={{color: Colors.lightGrey, fontSize: 14}}>
                        {item.duration} {item.memebershipType}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View
              style={{
                margin: '4%',
                backgroundColor: Colors.dark,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Colors.light}}>NO MEMBER YET</Text>
            </View>
          )}

          {/* outded memebers */}
          <View style={{}}>
            <Text style={{color: Colors.light, margin: '4%'}}>
              Expire this week
            </Text>
            {memebersList && memebersList.length > 0 ? (
              <View style={{marginVertical: 15, margin: '4%'}}>
                {memebersList.map((item) => {
                  return (
                    <View
                      key={(item) => item.id}
                      style={{
                        backgroundColor: Colors.dark,
                        padding: 10,
                        paddingHorizontal: 20,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'grey',
                      }}>
                      <View style={{marginVertical: 10}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: Colors.light,
                          }}>
                          {item.name.length > 20
                            ? item.name.substring(0, 20) + '...'
                            : item.name}
                        </Text>
                        <Text style={{color: Colors.lightGrey, fontSize: 14}}>
                          {item.duration} {item.memebershipType}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  margin: '4%',
                  backgroundColor: Colors.dark,
                  height: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Colors.light}}>No memeberT</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
