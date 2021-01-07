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
import moment from 'moment';
import {memebersList} from '../../../temps/data';
import Colors from '../../../theme/Colors';
import {goback, plus, archive, phone, email} from '../../../theme/Icons';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';

import {isExpired, filterList} from '../../utilities/functions';
import PreviewMemeber from './PreviewMemeber';

export default function Members() {
  const dispatch = useDispatch();

  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);
  const [memebersList, setmemebersList] = useState(DatabaseReducer.allMembers);
  const [memebersListFiltred, setmemebersListFiltred] = useState(
    DatabaseReducer.allMembers,
  );

  useEffect(() => {
    setmemebersList(DatabaseReducer.allMembers);
    setmemebersListFiltred(DatabaseReducer.allMembers);
    setlistFilter('all');
  }, [DatabaseReducer]);
  const navigation = useNavigation();
  const [listFilter, setlistFilter] = useState('all');
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
          profile_image: {
            uri: require('../../../assets/profilepichholder.png'),
          },
          phone_number: '',
          email: '',
        },
  );

  const [imageViewer, setimageViewer] = useState(false);

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
          onChangeText={(text) => {
            setmemebersListFiltred(filterList(text, memebersList));
          }}
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
              label="all"
              value="all"
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
            data={memebersListFiltred}
            renderItem={({item}) => {
              // isExpired(item.subscription.end_date)
              return (
                <View>
                  {listFilter === 'active' ? (
                    <View>
                      {isExpired(item.subscription.end_date) ? (
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
                                  <Text
                                    style={{
                                      color: Colors.lightGrey,
                                      fontSize: 12,
                                    }}>
                                    {moment(
                                      item.subscription.startingDate,
                                    ).format('DD MMMM YYYY')}
                                  </Text>
                                  <Text
                                    style={{
                                      color: Colors.lightGrey,
                                      fontSize: 12,
                                      paddingHorizontal: 10,
                                    }}>
                                    -
                                  </Text>
                                  {/* {console.log(item.subscription)} */}
                                  <Text
                                    style={{
                                      color: Colors.lightGrey,
                                      fontSize: 12,
                                    }}>
                                    {moment(item.subscription.end_date).format(
                                      'DD MMMM YYYY',
                                    )}
                                  </Text>
                                </View>
                              </View>

                              <Image
                                style={{
                                  width: 60,
                                  height: 60,
                                }}
                                // in case undifined img , to prevent ap from crash
                                source={
                                  item.profile_image.uri
                                    ? item.profile_image.uri
                                    : require('../../../assets/profilepichholder.png')
                                }
                              />
                              <View
                                style={{
                                  height: 12,
                                  width: 12,
                                  backgroundColor: isExpired(
                                    item.subscription.end_date,
                                  )
                                    ? Colors.green
                                    : Colors.red,
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  borderBottomLeftRadius: 10,
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <View />
                      )}
                    </View>
                  ) : (
                    <View>
                      {listFilter === 'all' ? (
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
                                  <Text
                                    style={{
                                      color: Colors.lightGrey,
                                      fontSize: 12,
                                    }}>
                                    {moment(
                                      item.subscription.startingDate,
                                    ).format('DD MMMM YYYY')}
                                  </Text>
                                  <Text
                                    style={{
                                      color: Colors.lightGrey,
                                      fontSize: 12,
                                      paddingHorizontal: 10,
                                    }}>
                                    -
                                  </Text>
                                  {/* {console.log(item.subscription)} */}
                                  <Text
                                    style={{
                                      color: Colors.lightGrey,
                                      fontSize: 12,
                                    }}>
                                    {moment(item.subscription.end_date).format(
                                      'DD MMMM YYYY',
                                    )}
                                  </Text>
                                </View>
                              </View>

                              <Image
                                style={{
                                  width: 60,
                                  height: 60,
                                }}
                                // in case undifined img , to prevent ap from crash
                                source={
                                  item.profile_image.uri
                                    ? item.profile_image.uri
                                    : require('../../../assets/profilepichholder.png')
                                }
                              />
                              <View
                                style={{
                                  height: 12,
                                  width: 12,
                                  backgroundColor: isExpired(
                                    item.subscription.end_date,
                                  )
                                    ? Colors.green
                                    : Colors.red,
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  borderBottomLeftRadius: 10,
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        // <Text>Not active</Text>
                        <View>
                          {isExpired(item.subscription.end_date) ? (
                            <View />
                          ) : (
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
                                          ? item.fullName.substring(0, 20) +
                                            '...'
                                          : item.fullName
                                        : ''}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                      <Text
                                        style={{
                                          color: Colors.lightGrey,
                                          fontSize: 12,
                                        }}>
                                        {moment(
                                          item.subscription.startingDate,
                                        ).format('DD MMMM YYYY')}
                                      </Text>
                                      <Text
                                        style={{
                                          color: Colors.lightGrey,
                                          fontSize: 12,
                                          paddingHorizontal: 10,
                                        }}>
                                        -
                                      </Text>
                                      {/* {console.log(item.subscription)} */}
                                      <Text
                                        style={{
                                          color: Colors.lightGrey,
                                          fontSize: 12,
                                        }}>
                                        {moment(
                                          item.subscription.end_date,
                                        ).format('DD MMMM YYYY')}
                                      </Text>
                                    </View>
                                  </View>

                                  <Image
                                    style={{
                                      width: 60,
                                      height: 60,
                                    }}
                                    // in case undifined img , to prevent ap from crash
                                    source={
                                      item.profile_image.uri
                                        ? item.profile_image.uri
                                        : require('../../../assets/profilepichholder.png')
                                    }
                                  />
                                  <View
                                    style={{
                                      height: 12,
                                      width: 12,
                                      backgroundColor: isExpired(
                                        item.subscription.end_date,
                                      )
                                        ? Colors.green
                                        : Colors.red,
                                      position: 'absolute',
                                      top: 0,
                                      right: 0,
                                      borderBottomLeftRadius: 10,
                                    }}
                                  />
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
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
      <PreviewMemeber
        selectedMember={selectedMember}
        imageViewer={imageViewer}
        setimageViewer={setimageViewer}
        profilePreviewModal={profilePreviewModal}
        setprofilePreviewModal={setprofilePreviewModal}
      />
    </View>
  );
}
