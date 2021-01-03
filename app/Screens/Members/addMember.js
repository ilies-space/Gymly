import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {useNavigation} from '@react-navigation/native';
import {goback, camera} from '../../../theme/Icons';
import {launchCamera} from 'react-native-image-picker';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {Sae} from 'react-native-textinput-effects';
import CheckBox from '@react-native-community/checkbox';

export default function addMember() {
  const navigation = useNavigation();
  const [avatarSource, setavatarSource] = useState(
    require('../../../assets/profilepichholder.png'),
  );

  const [date, setDate] = useState(new Date());
  const [toggleCheckBox, setToggleCheckBox] = useState(true);

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
          Add member
        </Text>
      </View>

      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            uploadImage();
            console.log('uploadImage();');
          }}
          style={{}}>
          <View style={{width: 100, height: 120, alignSelf: 'center'}}>
            <Image
              source={avatarSource}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                margin: 10,
                borderRadius: 50,
                backgroundColor: Colors.main,
              }}
            />
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: Colors.light,
              fontWeight: 'bold',
              flex: 1,
              textAlign: 'center',
              justifyContent: 'center',
              paddingTop: 12,
            }}>
            Member Name
          </Text>
        </View>

        {/* Form  */}

        <View
          style={{
            margin: '5%',
          }}>
          <Sae
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
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{color: Colors.light, fontWeight: 'bold'}}>
              Start from today
            </Text>
          </View>
          {/* date picker  */}
          {toggleCheckBox ? (
            <View />
          ) : (
            <View>
              <View style={{alignItems: 'center', marginVertical: 20}}>
                <DatePicker
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
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: Colors.main,
            paddingVertical: 20,
            marginHorizontal: 10,
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
