import {
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import { MaterialCommunityIcons } from '../../utils/preImport';
import { screenWidth } from '../../utils/css';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/StackParams';

interface IShowMap {
  navigation: NativeStackNavigationProp<RootStackParams>;
}
const ShowMap = ({ navigation }: IShowMap) => {
  const [myPosition, setMyPosition] = useState<any>();
  const [goMyCurrentPos, setGoMyCurrentPos] = useState<boolean>(false);
  const [isMakingAnchor, setIsMakingAnchor] = useState<boolean>(false);
  const [myAnchorPos, setMyAnchorPos] = useState<any>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('get current pos!');
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  }, [goMyCurrentPos]);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NaverMapView
        style={{ width: '100%', height: '100%' }}
        rotateGesturesEnabled={true}
        tiltGesturesEnabled={false}
        showsMyLocationButton={false}
        zoomGesturesEnabled={true}
        zoomControl={false}
        maxZoomLevel={20}
        minZoomLevel={10}
        onCameraChange={(e) => console.log(JSON.stringify(e))}
        onMapClick={(e) => {
          const { x, y, latitude, longitude } = e;
          //x,y 기준 left, top
          console.log(latitude, longitude, x, y, 'click');
          setIsMakingAnchor(true);
          setMyAnchorPos(e);
        }}
        center={{
          zoom: 17,
          latitude: myPosition?.latitude,
          longitude: myPosition?.longitude,
        }}>
        {isMakingAnchor && (
          <Marker
            coordinate={{
              latitude: myAnchorPos?.latitude,
              longitude: myAnchorPos?.longitude,
            }}
            pinColor="black"
            // width={50}
            // height={50}
            // image={require('../../assets/pin.png')}
            onClick={() => console.log('click')}
          />
        )}
      </NaverMapView>
      {isMakingAnchor && (
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('WritePost', { myAnchorPos })}
            style={{
              width: screenWidth * 0.5,
              height: 40,
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 80,
              alignSelf: 'center',
              borderRadius: 6,
              shadowOpacity: 0.5,
              shadowOffset: { width: 1, height: 1 },
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              내 시야공유하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsMakingAnchor(false);
            }}
            style={{
              width: screenWidth * 0.5,
              height: 40,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 30,
              alignSelf: 'center',
              borderRadius: 6,
              shadowOpacity: 0.5,
              shadowOffset: { width: 1, height: 1 },
            }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>취소</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 100,
          right: 20,
          backgroundColor: 'white',
          shadowOpacity: 0.5,
          shadowOffset: { width: 1, height: 1 },
        }}>
        <MaterialCommunityIcons name="refresh" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setGoMyCurrentPos((prev) => !prev)}
        activeOpacity={0.5}
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: 'white',
          shadowOpacity: 0.5,
          shadowOffset: { width: 1, height: 1 },
        }}>
        <MaterialCommunityIcons name="crosshairs-gps" size={24} />
      </TouchableOpacity>
    </>
  );
};

export default ShowMap;

const styles = StyleSheet.create({});
