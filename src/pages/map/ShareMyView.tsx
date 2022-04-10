import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NavBase from '../../components/base/NavBase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/StackParams';

interface IShareMyView {
  navigation: NativeStackNavigationProp<RootStackParams>;
  route: {
    params: {
      myAnchorPos: any;
    };
  };
}

const ShareMyView = ({
  route: {
    params: { myAnchorPos },
  },
}: IShareMyView) => {
  console.log(myAnchorPos);

  return <NavBase title="내 시야 공유" closeType={true}></NavBase>;
};

export default ShareMyView;

const styles = StyleSheet.create({});
