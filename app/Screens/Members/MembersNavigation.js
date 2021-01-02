import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Members from './Members';
import addMember from './addMember';

export default function MembersNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Members"
        component={Members}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addMember"
        component={addMember}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
