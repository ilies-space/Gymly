import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback, camera, menu, save, edit} from '../../../theme/Icons';
import {launchCamera} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

export default function addMember() {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [avatarSource, setavatarSource] = useState({
    uri: require('../../../assets/profilepichholder.png'),
  });
  const [durationUnit, setdurationUnit] = useState('Days');
  const [startingDate, setstartingDate] = useState(new Date());
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [memberName, setmemberName] = useState('');
  const [MembershipDuration, setMembershipDuration] = useState(30);
  const [memberPhoneNumber, setmemberPhoneNumber] = useState('');
  const [memberEmail, setmemberEmail] = useState('');

  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);
  function uploadImage() {
    launchCamera(
      {
        title: 'my pic app',
        takePhotoButtonTitle: 'Take photo with your camera',
        chooseFromLibraryButtonTitle: 'Choose photo from library',
      },
      (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image Picker Error: ', response.error);
        } else {
          setavatarSource({
            uri: response,
          });
        }
      },
    );
  }

  function calculate_end_date() {
    switch (durationUnit) {
      case 'Months':
        return moment(startingDate).add(MembershipDuration * 30, 'days');

      case 'Years':
        return moment(startingDate).add(MembershipDuration * 365, 'days');

      default:
        return moment(startingDate).add(MembershipDuration, 'days');
    }
  }

  function addNewMember(imageSource) {
    // check if member with the entred name already exist
    let lookup = DatabaseReducer.allMembers.find((element) => {
      return element.fullName.toLowerCase() === memberName.toLowerCase();
    });
    // add new member after checking everthing
    if (lookup) {
      alert('a member with this name already exist ! ');
    } else {
      const newMember = {
        id: memberName + Math.random(),
        fullName: memberName,
        subscription: {
          duration: MembershipDuration,
          unit: durationUnit,
          starting_date: startingDate,
          end_date: calculate_end_date(),
        },
        profile_image: imageSource,
        phone_number: memberPhoneNumber,
        email: memberEmail,
      };

      console.log(newMember);

      dispatch({
        type: 'addNewMember',
        newMember: newMember,
      });
      navigation.goBack();
    }
  }
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
          paddingVertical: '3%',
          paddingLeft: '3%',
          borderBottomWidth: 0.5,
          borderColor: Colors.dark,
          elevation: 3,
          margin: '1%',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (memberName === '') {
              navigation.goBack();
            } else {
              Alert.alert(
                'warrnig',
                'all your current data will be cleard on return ?',
                [
                  {
                    text: 'cancel',
                  },
                  {
                    text: 'confirm return',
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ],
              );
            }
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
          Add member
        </Text>

        <TouchableOpacity
          onPress={() => {
            // checkFormInput
            if (MembershipDuration <= 0 || isNaN(MembershipDuration)) {
              alert('memeberShipDuration is invalide');
            } else if (memberName === '') {
              alert('full name is invalide');
            } else {
              // if (avatarSource.uri) {
              //   addNewMember(avatarSource);
              // } else {
              //   addNewMember(require('../../../assets/profilepichholder.png'));
              // }
              addNewMember(avatarSource);
            }
          }}
          style={{
            alignItems: 'center',
            // backgroundColor: Colors.mainLight,
            // paddingHorizontal: 10,
          }}>
          {save}
        </TouchableOpacity>
      </View>

      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            uploadImage();
            console.log('uploadImage();');
          }}
          style={{}}>
          <View style={{width: 100, height: 100, alignSelf: 'center'}}>
            <Image
              source={avatarSource.uri}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                margin: 10,
                borderRadius: 50,
                backgroundColor: Colors.dark,
              }}
            />

            {avatarSource.uri ? (
              <View />
            ) : (
              <View style={{position: 'absolute', top: '50%', right: 25}}>
                <Text style={{color: Colors.light}}>UPLOAD</Text>
              </View>
            )}

            {/* Camera icon */}
            {true ? (
              <View
                style={{
                  position: 'absolute',
                  right: '2%',
                  bottom: '2%',
                  backgroundColor: Colors.light,
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {camera}
              </View>
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
        {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: Colors.light,
              fontWeight: 'bold',
              flex: 1,
              textAlign: 'center',
              justifyContent: 'center',
              paddingTop: 12,
            }}>
            {memberName}
          </Text>
        </View> */}

        {/* Form  */}

        <View
          style={{
            margin: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: Colors.light, fontWeight: 'bold'}}>
              Member full name
            </Text>
          </View>
          <TextInput
            placeholderTextColor={Colors.lightGrey}
            style={{
              flex: 3,
              borderColor: Colors.main,
              borderWidth: 0.5,
              color: Colors.light,
              textAlign: 'center',
            }}
            value={memberName}
            onChangeText={(NameInput) => {
              setmemberName(NameInput);
            }}
            placeholder={'Full name'}
          />

          {/* phone number  */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: Colors.light, fontWeight: 'bold'}}>
              MemberShip duration
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              placeholderTextColor={Colors.lightGrey}
              style={{
                flex: 3,
                borderColor: Colors.main,
                borderWidth: 0.5,
                color: Colors.light,
                textAlign: 'center',
              }}
              value={MembershipDuration.toString()}
              onChangeText={(duratuinInput) => {
                setMembershipDuration(duratuinInput);
              }}
              keyboardType={'number-pad'}
              placeholder={'00'}
            />
            <View style={{flex: 2, justifyContent: 'center'}}>
              <Picker
                style={{color: Colors.light}}
                dropdownIconColor={'white'}
                mode={'dropdown'}
                selectedValue={durationUnit}
                onValueChange={(itemValue) => setdurationUnit(itemValue)}>
                <Picker.Item
                  //  color={Colors.dark}
                  label="Days"
                  value="Days"
                />
                <Picker.Item
                  //  color={Colors.dark}
                  label="Months"
                  value="Months"
                />
                <Picker.Item
                  // color={Colors.light}
                  label="Years"
                  value="Years"
                />
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: Colors.light, fontWeight: 'bold'}}>
              subscribtion starting date
            </Text>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              tintColor={Colors.light}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <TouchableOpacity
              onPress={() => setToggleCheckBox(!toggleCheckBox)}>
              <Text style={{color: Colors.light, fontWeight: 'bold'}}>
                Start from today
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* date picker  */}
          {toggleCheckBox ? (
            <TouchableOpacity
              onPress={() => setToggleCheckBox(!toggleCheckBox)}>
              <View
                style={{
                  marginVertical: 5,
                  backgroundColor: Colors.grey,
                  alignItems: 'center',
                  paddingVertical: 15,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: Colors.light,
                    fontWeight: 'bold',
                    flex: 1,
                  }}>
                  {JSON.stringify(startingDate)}
                </Text>
                {edit}
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <DatePicker
                  style={{height: 100}}
                  date={startingDate}
                  onDateChange={setstartingDate}
                  mode="date"
                  textColor={Colors.main}
                  fadeToColor={Colors.grey}
                />
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: Colors.light, fontWeight: 'bold'}}>
              Phone Number
            </Text>
          </View>
          <TextInput
            placeholderTextColor={Colors.lightGrey}
            style={{
              flex: 3,
              borderColor: Colors.main,
              borderWidth: 0.5,
              color: Colors.light,
              textAlign: 'center',
            }}
            value={memberPhoneNumber}
            onChangeText={(numberPhoneInput) => {
              setmemberPhoneNumber(numberPhoneInput);
            }}
            placeholder={'Phone Number optional'}
            keyboardType={'number-pad'}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: Colors.light, fontWeight: 'bold'}}>Email</Text>
          </View>
          <TextInput
            keyboardType={'email-address'}
            placeholderTextColor={Colors.lightGrey}
            style={{
              flex: 3,
              borderColor: Colors.main,
              borderWidth: 0.5,
              color: Colors.light,
              textAlign: 'center',
            }}
            value={memberEmail}
            onChangeText={(emailInput) => {
              setmemberEmail(emailInput);
            }}
            placeholder={'E-mail optional'}
          />
        </View>
      </ScrollView>
    </View>
  );
}
