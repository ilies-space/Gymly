import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from './Colors';

export const myIcon = <AntDesign name="stepforward" size={26} color="#fff" />;

export const notifications = (
  <Ionicons name="notifications-outline" size={25} color={Colors.light} />
);
export const menu = <Feather name="menu" size={25} color={Colors.light} />;

export const plus = <Feather name="plus" size={30} color={Colors.main} />;

export const camera = <Feather name="camera" size={20} color={Colors.dark} />;

export const goback = (
  <Feather name="arrow-left" size={25} color={Colors.light} />
);

export const save = (
  <Feather name="check-square" size={30} color={Colors.main} />
);

export const archive = <Feather name="archive" size={30} color={Colors.red} />;

export const phone = <Feather name="phone" size={25} color={Colors.light} />;
export const email = <Feather name="mail" size={25} color={Colors.light} />;

export const edit = <Feather name="edit" size={25} color={Colors.main} />;
