import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../theme/Colors';
import {menu, myIcon, notifications} from '../../../theme/Icons';
import {memebersList} from '../../../temps/data';
import {PieChart, ProgressChart} from 'react-native-chart-kit';
export default function Home() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

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
          GymName
        </Text>
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
      </View>

      {/* Main view  */}
      <ScrollView>
        <View style={{flex: 1}}>
          {/* Total members Card */}
          <View
            style={{
              backgroundColor: Colors.dark,
              borderRadius: 12,
              padding: '3%',
              margin: '4%',
              flexDirection: 'row',
            }}>
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
                  20
                </Text>
                {/* <Text style={{color: Colors.light, fontSize: 10}}>members</Text> */}
              </View>
            </View>

            <View style={{}}>
              {/* Chart graph START  */}
              <PieChart
                data={[
                  {
                    name: 'Active',
                    population: 10,
                    color: Colors.mainLight,
                    legendFontColor: Colors.light,
                    legendFontSize: 12,
                  },
                  {
                    name: 'inActive',
                    population: 5,
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
              {/* <ProgressChart
                data={{
                  labels: ['active', 'inactive'], // optional
                  data: [0.4, 0.6],
                }}
                width={screenWidth / 2}
                height={100}
                strokeWidth={5}
                radius={20}
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
                hideLegend={false}
              /> */}
              {/* Chart graph END  */}
            </View>
          </View>

          {/* CARD  recently view */}

          <View>
            <Text style={{color: Colors.light, margin: '3%'}}>
              Recently subscribed
            </Text>
          </View>

          {memebersList && memebersList.length > 0 ? (
            <FlatList
              horizontal
              data={memebersList}
              key={(item, index) => item.id + index}
              renderItem={({item}) => {
                return (
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
                          source={{
                            uri: item.img,
                          }}
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
                        {item.name.length > 10
                          ? item.name.substring(0, 10) + '...'
                          : item.name}
                      </Text>
                      <Text style={{color: Colors.lightGrey, fontSize: 14}}>
                        {item.duration} {item.memebershipType}
                      </Text>
                    </View>
                  </View>
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
            <Text style={{color: Colors.light, margin: '4%'}}>
              Expire this week
            </Text>
            {memebersList && memebersList.length > 0 ? (
              <View style={{marginVertical: 1, margin: '4%'}}>
                {memebersList.map((item) => {
                  return (
                    <View
                      key={item.id}
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
                            {item.name.length > 20
                              ? item.name.substring(0, 20) + '...'
                              : item.name}
                          </Text>
                          <Text style={{color: Colors.red, fontSize: 12}}>
                            - {item.duration} days
                          </Text>
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
      </ScrollView>
    </View>
  );
}
