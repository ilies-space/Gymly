import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback, camera, menu, save} from '../../../theme/Icons';
import {launchCamera} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {Sae} from 'react-native-textinput-effects';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

export default function addMember() {
  const navigation = useNavigation();
  const [avatarSource, setavatarSource] = useState(
    require('../../../assets/profilepichholder.png'),
  );
  const [listFilter, setlistFilter] = useState('All');
  const [date, setDate] = useState(new Date());
  const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [memberName, setmemberName] = useState('');
  const [MembershipDuration, setMembershipDuration] = useState(30);

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
            uri: response.uri,
          });
        }
      },
    );
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
          Add member
        </Text>

        <TouchableOpacity
          onPress={() => {
            console.log('save member: ' + memberName);
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
              source={avatarSource}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                margin: 10,
                borderRadius: 50,
                backgroundColor: Colors.dark,
              }}
            />

            <View style={{position: 'absolute', top: '50%', right: 25}}>
              <Text style={{color: Colors.light}}>UPLOAD</Text>
            </View>

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
          {/* <Sae
            value={memberName}
            onChangeText={(NameInput) => {
              setmemberName(NameInput);
            }}
            label={'Full name'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
            inputPadding={16}
            labelHeight={24}
            // active border height
            borderHeight={2}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
            iconColor={Colors.main}
            labelStyle={{color: Colors.light}}
            inputStyle={{color: Colors.light}}
          /> */}

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
              borderWidth: 1,
              color: Colors.light,
              textAlign: 'center',
            }}
            value={memberName}
            onChangeText={(NameInput) => {
              setmemberName(NameInput);
            }}
            placeholder={'Full name'}
          />
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
                borderWidth: 1,
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
                selectedValue={listFilter}
                onValueChange={(itemValue) => setlistFilter(itemValue)}>
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
                }}>
                <Text style={{color: Colors.light, fontWeight: 'bold'}}>
                  {JSON.stringify(date)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View>
              <View
                style={
                  {
                    // alignItems: 'center',
                  }
                }>
                <DatePicker
                  style={{height: 100}}
                  date={date}
                  onDateChange={setDate}
                  mode="date"
                  textColor={Colors.main}
                  fadeToColor={Colors.grey}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
