import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {memebersList} from '../../../temps/data';
import Colors from '../../../theme/Colors';
import {goback} from '../../../theme/Icons';

export default function MembersArchived() {
  const navigation = useNavigation();
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
          Archivied members
        </Text>
      </View>

      {/* Search Area  */}
      <View style={{flexDirection: 'row', alignItems: 'center', margin: '4%'}}>
        <TextInput
          placeholder={'Search by name'}
          style={{
            borderWidth: 0.5,
            borderColor: Colors.lightGrey,
            color: Colors.light,
            paddingHorizontal: 10,
            borderRadius: 5,
            flex: 1,
          }}
          placeholderTextColor={Colors.light}
        />
      </View>

      {/* Lst of memebers   */}
      <View style={{marginVertical: 1, margin: '4%', flex: 1}}>
        {memebersList && memebersList.length ? (
          <FlatList
            style={
              {
                // marginVertical: '4%',
                // borderWidth: 1,
                // borderColor: Colors.light,
              }
            }
            keyExtractor={(item, index) => item.id + index}
            data={memebersList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    alert(JSON.stringify(item));
                  }}>
                  <View
                    style={{
                      backgroundColor: Colors.dark,
                      padding: 10,
                      paddingHorizontal: 10,
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
                          {item.name
                            ? item.name.length > 20
                              ? item.name.substring(0, 20) + '...'
                              : item.name
                            : ''}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{color: Colors.lightGrey, fontSize: 12}}>
                            21/01/2021
                          </Text>
                          <Text style={{color: Colors.lightGrey, fontSize: 12}}>
                            -
                          </Text>
                          <Text style={{color: Colors.lightGrey, fontSize: 12}}>
                            21/02/2021
                          </Text>
                        </View>
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
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text style={{color: Colors.light}}>No member archivied</Text>
          </View>
        )}
      </View>
    </View>
  );
}
