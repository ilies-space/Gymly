import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {menu, notifications} from '../../../theme/Icons';
import {memebersList} from '../../../temps/data';
import {PieChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {
  calculateActiveMemners,
  calculateDaysLeft,
  calculateHowmuchwillExpirethisWeek,
} from '../../utilities/functions';
import PreviewMemeber from '../Members/PreviewMemeber';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Home() {
  const DatabaseReducer = useSelector((state) => state.DatabaseReducer);
  const [gymName, setgymName] = useState('GymName');
  const [allMembers, setallMembers] = useState([]);
  const [expireThisWeekCounter, setexpireThisWeekCounter] = useState(0);

  useEffect(() => {
    setallMembers(DatabaseReducer.allMembers);
    setgymName(DatabaseReducer.gymName);
  }, [DatabaseReducer]);

  var thisWeekExpire = calculateHowmuchwillExpirethisWeek(allMembers);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  // refreshing : **********
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    console.log('Refreshing data');
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [selectedMember, setselectedMember] = useState(
    // must't be undifined becaus it's been used in the modal
    allMembers.length > 0
      ? allMembers[0]
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
  const [profilePreviewModal, setprofilePreviewModal] = useState(false);

  return (
    <View
      style={{
        backgroundColor: Colors.grey,
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
            navigation.openDrawer();
          }}>
          {menu}
        </TouchableOpacity>
        <Text
          style={{
            color: Colors.light,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
          }}>
          {gymName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Notifications');
          }}>
          <View>
            <View>{notifications}</View>
            {/* BADG */}
            {true ? (
              <View
                style={{
                  backgroundColor: Colors.main,
                  height: 10,
                  width: 10,
                  borderRadius: 10 / 2,
                  position: 'absolute',
                  right: 0,
                }}
              />
            ) : (
              <View />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Main view  */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1}}>
          {/* Total members Card */}

          <View
            style={{
              backgroundColor: Colors.dark,
              margin: '4%',
              borderRadius: 12,
            }}>
            {/* curret date  */}
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.lightGrey,
                  padding: 10,
                }}>
                {moment().format('DD MMMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                padding: '3%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: Colors.light}}>All subscribers</Text>

                  <View
                    style={{
                      // margin: '4%',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 40,
                        paddingRight: 4,
                        color: Colors.light,
                      }}>
                      {allMembers.length ? allMembers.length : '00'}
                    </Text>
                    {/* <Text style={{color: Colors.light, fontSize: 10}}>members</Text> */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                }}>
                {/* Chart graph START  */}
                <PieChart
                  data={[
                    {
                      name: 'Active',
                      population: calculateActiveMemners(allMembers),
                      color: Colors.mainLight,
                      legendFontColor: Colors.light,
                      legendFontSize: 12,
                    },
                    {
                      name: 'inActive',
                      population:
                        allMembers.length - calculateActiveMemners(allMembers),
                      color: Colors.red,
                      legendFontColor: Colors.light,
                      legendFontSize: 12,
                    },
                  ]}
                  width={screenWidth / 2}
                  height={90}
                  chartConfig={{
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',

                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // optional
                  }}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  paddingLeft={'2'}
                  center={[2, 2]}
                  absolute
                />
              </View>
            </View>
          </View>

          {/* CARD  recently view */}

          <View>
            <Text style={{color: Colors.light, margin: '3%'}}>
              Recently subscribed
            </Text>
          </View>

          {/* display only the last 4 members */}

          {allMembers && allMembers.length > 0 ? (
            <FlatList
              horizontal
              data={allMembers.slice(0, 4)}
              key={(item, index) => item.id + index}
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
                        marginHorizontal: 10,
                        borderRadius: 10,
                        padding: 10,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        width: 150,
                      }}>
                      <View style={{alignItems: 'center'}}>
                        <View
                          style={{
                            height: 80,
                            width: 80,
                          }}>
                          <Image
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 80 / 2,
                            }}
                            source={
                              item.profile_image.uploaded
                                ? item.profile_image.uri
                                : require('../../../assets/profilepichholder.png')
                            }
                          />
                        </View>
                      </View>

                      <View style={{alignItems: 'center', marginVertical: 10}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: Colors.light,
                          }}>
                          {item.fullName.length > 9
                            ? item.fullName.substring(0, 8) + '..'
                            : item.fullName}
                        </Text>
                        <Text style={{color: Colors.lightGrey, fontSize: 14}}>
                          {item.subscription.duration} {item.subscription.unit}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{
                margin: '4%',
                backgroundColor: Colors.dark,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Colors.light}}>NO MEMBER YET</Text>
            </View>
          )}

          {/* outded memebers */}
          <View style={{}}>
            <Text
              style={{
                color: Colors.light,
                marginHorizontal: '4%',
                marginTop: '4%',
              }}>
              Expire this week
            </Text>

            {calculateHowmuchwillExpirethisWeek(allMembers) > 0 ? (
              <View
                style={{
                  marginHorizontal: '4%',
                  marginTop: 2,
                  marginBottom: 10,
                }}>
                <Text style={{color: Colors.lightGrey}}>
                  {calculateHowmuchwillExpirethisWeek(allMembers)} memeber will
                  expire this week
                </Text>
              </View>
            ) : (
              <View
                style={{
                  margin: '4%',
                  backgroundColor: Colors.dark,
                  height: 150,
                  justifyContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: Colors.light}}>
                    NO ONE will expire this week
                  </Text>
                </View>
              </View>
            )}
            {allMembers && allMembers.length > 0 ? (
              <View style={{marginVertical: 1, margin: '4%'}}>
                {allMembers.map((item) => {
                  return (
                    <View key={item.id}>
                      {calculateDaysLeft(item.subscription.end_date) <= 7 &&
                      calculateDaysLeft(item.subscription.end_date) > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setselectedMember(item);

                            setprofilePreviewModal(true);
                          }}>
                          <View
                            style={{
                              backgroundColor: Colors.dark,
                              padding: 10,
                              paddingHorizontal: 20,
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
                                  {item.fullName.length > 20
                                    ? item.fullName.substring(0, 20) + '...'
                                    : item.fullName}
                                </Text>
                                <Text style={{color: Colors.red, fontSize: 12}}>
                                  {/* {moment(item.subscription.end_date).format(
                                  'DD MMMM YYYY',
                                )} */}
                                  {calculateDaysLeft(
                                    item.subscription.end_date,
                                  )}{' '}
                                  days left
                                </Text>
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
                      ) : (
                        <View key={item.id}>
                          {/* <Text>NO this week</Text> */}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  margin: '4%',
                  backgroundColor: Colors.dark,
                  height: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Colors.light}}>No memeberT</Text>
              </View>
            )}
          </View>
        </View>

        <PreviewMemeber
          selectedMember={selectedMember}
          imageViewer={imageViewer}
          setimageViewer={setimageViewer}
          profilePreviewModal={profilePreviewModal}
          setprofilePreviewModal={setprofilePreviewModal}
        />
      </ScrollView>
    </View>
  );
}
