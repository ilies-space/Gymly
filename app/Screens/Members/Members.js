import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import ImagePreview from 'react-native-image-preview';

import {memebersList} from '../../../temps/data';
import Colors from '../../../theme/Colors';
import {goback, plus, archive, phone, email} from '../../../theme/Icons';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';

export default function Members() {
  const dispatch = useDispatch();

  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);
  const [memebersList, setmemebersList] = useState([]);
  useEffect(() => {
    setmemebersList(DatabaseReducer.allMembers);
  }, [DatabaseReducer]);
  const navigation = useNavigation();
  const [listFilter, setlistFilter] = useState('Days');
  const [profilePreviewModal, setprofilePreviewModal] = useState(false);
  const [selectedMember, setselectedMember] = useState(
    // must't be undifined becaus it's been used in the modal
    memebersList.length > 0
      ? memebersList[0]
      : {
          subscription: {
            duration: '',
            unit: '',
            starting_date: '',
            end_date: '',
          },
          profile_image: '',
          phone_number: '',
          email: '',
        },
  );
  const [imageViewer, setimageViewer] = useState(false);
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
            keyExtractor={(item, index) => item.id + index}
            data={memebersList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setselectedMember(item);

                    setprofilePreviewModal(true);
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
                          {item.fullName
                            ? item.fullName.length > 20
                              ? item.fullName.substring(0, 20) + '...'
                              : item.fullName
                            : ''}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{color: Colors.lightGrey, fontSize: 12}}>
                            {JSON.stringify(item.subscription.starting_date)}
                          </Text>
                          <Text
                            style={{
                              color: Colors.lightGrey,
                              fontSize: 12,
                              paddingHorizontal: 10,
                            }}>
                            -
                          </Text>
                          {console.log(item.subscription)}
                          <Text style={{color: Colors.lightGrey, fontSize: 12}}>
                            {JSON.stringify(item.subscription.end_date)}
                          </Text>
                        </View>
                      </View>

                      <Image
                        style={{
                          width: 60,
                          height: 60,
                        }}
                        source={item.profile_image}
                      />
                      {console.log(item.profile_image)}
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
        <TouchableWithoutFeedback
          onPress={() => {
            setprofilePreviewModal(false);
          }}>
          <View
            style={{
              backgroundColor: 'black',
              height: '100%',
              opacity: 0.7,
            }}
          />
        </TouchableWithoutFeedback>
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
              {selectedMember.fullName}
            </Text>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'warning',
                  'confirme to archive : ' + selectedMember.fullName,
                  [
                    {
                      text: 'cancel',
                    },
                    {
                      text: 'archive',
                      onPress: () => {
                        dispatch({
                          type: 'addNewMemberToArchive',
                          newMember: selectedMember,
                        });
                        setprofilePreviewModal(false);
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
                <TouchableOpacity onPress={() => setimageViewer(true)}>
                  <Image
                    source={selectedMember.profile_image}
                    style={{
                      width: 90,
                      height: 90,
                      alignSelf: 'center',
                      margin: 10,
                      borderRadius: 50,
                      backgroundColor: Colors.dark,
                    }}
                  />
                  <ImagePreview
                    close={() => setimageViewer(false)}
                    visible={imageViewer}
                    source={selectedMember.profile_image}
                  />
                </TouchableOpacity>
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
                      {selectedMember.subscription.end_date
                        ? selectedMember.subscription.end_date
                        : '00'}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: Colors.lightGrey}}>active since</Text>
                    <Text style={{fontWeight: 'bold', color: Colors.main}}>
                      {JSON.stringify(
                        selectedMember.subscription.starting_date,
                      )}
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
                  {selectedMember.subscription.end_date
                    ? selectedMember.subscription.end_date
                    : '00'}
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
                  {selectedMember.subscription.duration}{' '}
                  {selectedMember.subscription.unit}
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
                  {selectedMember.phone_number === ''
                    ? 'not provided'
                    : selectedMember.phone_number}
                </Text>
                {selectedMember.phone_number === '' ? (
                  <View />
                ) : (
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
                )}
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
                <Text style={{color: Colors.light}}>Email : </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: Colors.light,
                    flex: 1,
                  }}>
                  {selectedMember.email === ''
                    ? 'not provided'
                    : selectedMember.email}
                </Text>
                {selectedMember.email === '' ? (
                  <View />
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: true ? Colors.green : Colors.lightGrey,
                      padding: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      alert('send mail to memeber ');
                    }}>
                    {email}
                  </TouchableOpacity>
                )}
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
