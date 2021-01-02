import React from 'react';
import {View, Text, Image} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {memebersList} from '../../../temps/data';
import Colors from '../../../theme/Colors';

export default function Members() {
  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
      }}>
      {/* Search Area  */}
      <View style={{margin: '3%', flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholder={'Search by name'}
          style={{
            borderWidth: 0.5,
            borderColor: Colors.lightGrey,
            color: Colors.light,
            paddingHorizontal: 10,
            borderRadius: 5,
            flex: 4,
          }}
          placeholderTextColor={Colors.light}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity>
            <Text style={{color: Colors.main, paddingHorizontal: 10}}>ALL</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lst of memebers   */}
      <View style={{marginVertical: 1, margin: '4%'}}>
        {memebersList.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                backgroundColor: Colors.dark,
                padding: 10,
                paddingHorizontal: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.grey,
              }}>
              <View
                style={{
                  marginVertical: 4,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: Colors.light,
                    }}>
                    {item.name.length > 20
                      ? item.name.substring(0, 20) + '...'
                      : item.name}
                  </Text>
                  <Text style={{color: Colors.lightGrey, fontSize: 12}}>
                    - {item.duration} days
                  </Text>
                </View>

                <Image
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  source={{
                    uri: item.img,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
