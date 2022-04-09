import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NavBase from '../../components/base/NavBase';

interface IWritePost {
  route: {
    params: {
      myAnchorPos: any;
    };
  };
}

const WritePost = ({
  route: {
    params: { myAnchorPos },
  },
}: IWritePost) => {
  console.log(myAnchorPos);

  return <NavBase title="내 시야 공유" closeType={true}></NavBase>;
};

export default WritePost;

const styles = StyleSheet.create({});
