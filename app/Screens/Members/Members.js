import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {memebersList} from '../../../temps/data';
import Colors from '../../../theme/Colors';
import {goback, plus, archive, phone} from '../../../theme/Icons';
import {Picker} from '@react-native-picker/picker';
import {useEffect} from 'react';

export default function Members() {
  const navigation = useNavigation();
  const [listFilter, setlistFilter] = useState('Days');
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
          backgroundColor: Colors.light,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          position: 'absolute',
          bottom: 20,
          right: 20,
          elevation: 10,
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
            backgroundColor: Colors.grey,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          {/* Header */}
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: '3%',
              paddingLeft: '3%',
              borderBottomWidth: 0.5,
              borderColor: Colors.dark,
              elevation: 3,
              margin: '1%',
            }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.goBack();
                setprofilePreviewModal(false);
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
              {selectedMember.name}
            </Text>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'warning',
                  'confir to archive : ' + selectedMember.name,
                  [
                    {
                      text: 'cancel',
                    },
                    {
                      text: 'archive',
                      onPress: () => {
                        console.log('Archiving ' + selectedMember + '....');
                      },
                    },
                  ],
                );
              }}
              style={{
                alignItems: 'center',
                marginRight: 15,
              }}>
              {archive}
            </TouchableOpacity>
          </View>
          {/* main conetent */}
          <ScrollView>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View>
                <Image
                  source={{uri: selectedMember.img}}
                  style={{
                    width: 90,
                    height: 90,
                    alignSelf: 'center',
                    margin: 10,
                    borderRadius: 50,
                    backgroundColor: Colors.dark,
                  }}
                />
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 20 / 2,
                    backgroundColor: true ? Colors.green : Colors.red,
                    position: 'absolute',
                    top: 15,
                    right: 10,
                  }}
                />
              </View>
              {/* name */}
              <View>
                <Text style={{color: Colors.light, fontWeight: 'bold'}}>
                  {selectedMember.name}
                </Text>
              </View>
              {/* statistique  */}
              <View style={{width: '100%', paddingVertical: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    // width: '100%',
                    marginVertical: 20,
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: Colors.light,
                    margin: '4%',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: Colors.lightGrey}}>Days left</Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: Colors.main,
                      }}>
                      15
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: Colors.lightGrey}}>active since</Text>
                    <Text style={{fontWeight: 'bold', color: Colors.main}}>
                      21/01/2021
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: Colors.lightGrey}}>passed days</Text>

                    <Text style={{fontWeight: 'bold', color: Colors.main}}>
                      15
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* more info  */}

            <View style={{margin: '4%'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  borderBottomWidth: 0.3,
                  paddingVertical: 12,
                  marginVertical: 5,
                  flexDirection: 'row',
                  borderBottomColor: Colors.light,
                }}>
                <Text style={{color: Colors.light}}>subscribtion end : </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Colors.light,
                  }}>
                  21/01/2021
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  borderBottomWidth: 0.3,
                  paddingVertical: 12,
                  marginVertical: 5,
                  flexDirection: 'row',
                  borderBottomColor: Colors.light,
                }}>
                <Text style={{color: Colors.light}}>
                  subscribtion duration :{' '}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Colors.light,
                  }}>
                  30 days
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  borderBottomWidth: 0.3,
                  paddingVertical: 12,
                  marginVertical: 5,
                  flexDirection: 'row',
                  borderBottomColor: Colors.light,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.light}}>Phone number : </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Colors.light,
                    flex: 1,
                  }}>
                  0776749201
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: true ? Colors.green : Colors.lightGrey,
                    padding: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    alert('Calling memeber ');
                  }}>
                  {phone}
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                color: Colors.light,
                flex: 1,
                margin: '4%',
              }}>
              Invite member
            </Text>

            <Image
              source={require('../../../assets/iliesgithubqrcode.png')}
              style={{
                width: 150,
                height: 150,
                alignSelf: 'center',
                margin: 10,
                backgroundColor: Colors.dark,
              }}
            />

            <Text
              style={{
                color: Colors.lightGrey,
                flex: 1,
                margin: '4%',
                textAlign: 'auto',
                padding: 10,
              }}>
              Stay updated with your memebership details and how much days left
              from your app by scning this qrcode using : Gymly client side app
              on play store .
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
