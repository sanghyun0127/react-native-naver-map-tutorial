import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { screenHeight, screenWidth } from '../../utils/css';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * backgroundColor: MainBlue Color,
 * 뒤로가기 버튼: navigation.navigate.goBack()
 * <Body>부분은 직접 만들어서 넣기
 * 사용방법은
 * const yourComponent = () => {
 * ...
 *
 * return(
 *  <Base>
 *    <Your View />
 *  </Base>
 * )
 * }
 */

interface INavBase {
  title?: string;
  onBackButton?: boolean;
  children?: any;
  headerRight?: any;
  closeType?: boolean;
}

const NavBase = ({
  title,
  onBackButton = true,
  children,
  headerRight,
  closeType = false,
}: INavBase) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: screenHeight, backgroundColor: 'white' }}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          width: screenWidth,
          height: 50,
          paddingLeft: 20,
          paddingRight: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {onBackButton === true && (
          <Pressable onPress={() => navigation.goBack()} style={{}}>
            {!closeType ? (
              <Ionicons name="chevron-back" size={26} />
            ) : (
              <Ionicons name="close" size={26} />
            )}
          </Pressable>
        )}
        {title && (
          <View
            style={{
              width: 200,
              position: 'absolute',
              left: screenWidth / 2 - 100,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}>
              {title}
            </Text>
          </View>
        )}
        <View style={{ position: 'absolute', right: 30 }}>{headerRight}</View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default NavBase;

const styles = StyleSheet.create({});
