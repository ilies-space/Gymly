import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Colors from '../../../theme/Colors';
import {goback} from '../../../theme/Icons';
import moment from 'moment';
import PreviewMemeber from './PreviewMemeber';

export default function MembersArchived() {
  const [archiviedMembers, setarchiviedMembers] = useState([]);

  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);
  useEffect(() => {
    setarchiviedMembers(DatabaseReducer.archiviedMembers);
  }, [DatabaseReducer]);

  const [selectedMember, setselectedMember] = useState({
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
  });
  const [imageViewer, setimageViewer] = useState(false);
  const [profilePreviewModal, setprofilePreviewModal] = useState(false);

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
        {archiviedMembers && archiviedMembers.length ? (
          <FlatList
            keyExtractor={(item, index) => item.id + index}
            data={archiviedMembers}
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
                            {moment(item.subscription.starting_date).format(
                              'DD MMMM YYYY',
                            )}
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
                        source={
                          item.profile_image.uploaded
                            ? item.profile_image.uri
                            : require('../../../assets/profilepichholder.png')
                        }
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

      <PreviewMemeber
        selectedMember={selectedMember}
        imageViewer={imageViewer}
        setimageViewer={setimageViewer}
        profilePreviewModal={profilePreviewModal}
        setprofilePreviewModal={setprofilePreviewModal}
        action={'archive'}
      />
    </View>
  );
}
