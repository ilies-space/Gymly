import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, Modal, Button} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {memebersList} from '../../../temps/data';
import Colors from '../../../theme/Colors';
import {plus} from '../../../theme/Icons';
import {Picker} from '@react-native-picker/picker';
import {useEffect} from 'react';

export default function Members() {
  const navigation = useNavigation();
  const [listFilter, setlistFilter] = useState('All');
  const [profilePreviewModal, setprofilePreviewModal] = useState(false);
  const [selectedMember, setselectedMember] = useState('');

  // filtring listner
  useEffect(() => {
    console.log('filtermember by : ' + listFilter);
  }, [listFilter]);
  return (
    <View
      style={{
        backgroundColor: Colors.dark,
        flex: 1,
      }}>
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
            flex: 2,
          }}
          placeholderTextColor={Colors.light}
        />
        <View style={{flex: 1}}>
          <Picker
            style={{color: Colors.light}}
            dropdownIconColor={'white'}
            mode={'dropdown'}
            selectedValue={listFilter}
            onValueChange={(itemValue) => setlistFilter(itemValue)}>
            <Picker.Item
              //  color={Colors.dark}
              label="All"
              value="All"
            />
            <Picker.Item
              //  color={Colors.dark}
              label="active"
              value="active"
            />
            <Picker.Item
              // color={Colors.light}
              label="inactive"
              value="inactive"
            />
          </Picker>
        </View>
      </View>

      {/* profile preview  */}

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
                    setprofilePreviewModal(true);
                    setselectedMember(item);
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
            <Text style={{color: Colors.light}}>No member</Text>
          </View>
        )}
      </View>

      <View
        style={{
          backgroundColor: Colors.main,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('addMember');
          }}
          style={{}}>
          {plus}
        </TouchableOpacity>
      </View>
      <Modal visible={profilePreviewModal} transparent animationType={'slide'}>
        <View
          style={{
            backgroundColor: 'black',
            height: '100%',
            opacity: 0.7,
          }}
        />
        <View
          style={{
            height: '80%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          <Button
            title={'close'}
            onPress={() => {
              setprofilePreviewModal(false);
            }}
          />
          <Text> {JSON.stringify(selectedMember)} </Text>
        </View>
      </Modal>
    </View>
  );
}
