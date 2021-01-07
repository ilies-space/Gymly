import React from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePreview from 'react-native-image-preview';
import moment from 'moment';
import Colors from '../../../theme/Colors';
import {goback, archive, phone, email} from '../../../theme/Icons';
import {isExpired} from '../../utilities/functions';
import {useDispatch} from 'react-redux';
export default function PreviewMemeber({
  selectedMember,
  imageViewer,
  setimageViewer,
  profilePreviewModal,
  setprofilePreviewModal,
}) {
  console.log({selectedMember});
  //   const selectedMember = {
  //     subscription: {
  //       duration: '',
  //       unit: '',
  //       starting_date: '',
  //       end_date: '',
  //     },
  //     profile_image: {
  //       uri: require('../../../assets/profilepichholder.png'),
  //     },
  //     phone_number: '',
  //     email: '',
  //   };

  const dispatch = useDispatch();
  return (
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
                  source={selectedMember.profile_image.uri}
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
                  source={selectedMember.profile_image.uri}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 20 / 2,
                  backgroundColor: isExpired(
                    selectedMember.subscription.end_date,
                  )
                    ? Colors.green
                    : Colors.red,
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
                  <Text style={{color: Colors.lightGrey}}>Ending date</Text>
                  <Text style={{fontWeight: 'bold', color: Colors.main}}>
                    {moment(selectedMember.subscription.end_date).format(
                      'DD/MM/YY',
                    )}
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
              <Text style={{color: Colors.light}}>starting date : </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.light,
                }}>
                {moment(selectedMember.subscription.starting_date).format(
                  'DD MMMM YYYY',
                )}
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
            from your app by scning this qrcode using : Gymly client side app on
            play store .
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

{
  /* <PreviewMemeber 
     imageViewer = {imageViewer}
     setimageViewer = {setimageViewer}
     archive = {archive}
     selectedMember  = {selectedMember}
     goback = {goback}
Colors = {Colors}
profilePreviewModal = {profilePreviewModal}
     setprofilePreviewModal  ={setprofilePreviewModal}

     /> */
}
