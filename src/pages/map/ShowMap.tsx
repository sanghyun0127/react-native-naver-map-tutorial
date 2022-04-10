import {
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
import CalDistance from '../../components/functions/calDistance';
import { useAppSelector } from '../../redux/hook';
import { markerListStatus } from '../../redux/marker';
import ReactNativeModal from 'react-native-modal';
import Video from 'react-native-video';

type myPositionType = {
  latitude: number;
  longitude: number;
};

type myAnchorPosType = {
  x: number;
  y: number;
  latitude: number;
  longitude: number;
};

interface IShowMap {
  navigation: NativeStackNavigationProp<RootStackParams>;
}
const ShowMap = ({ navigation }: IShowMap) => {
  //redux
  const markerList = useAppSelector(markerListStatus);

  //state
  //position
  const [myPosition, setMyPosition] = useState<myPositionType>({
    latitude: 0,
    longitude: 0,
  });
  const [goMyCurrentPos, setGoMyCurrentPos] = useState<boolean>(false);
  const [centerPos, setCenterPos] = useState<myPositionType>({
    latitude: 0,
    longitude: 0,
  });
  const [isMakingAnchor, setIsMakingAnchor] = useState<boolean>(false);
  const [myAnchorPos, setMyAnchorPos] = useState<myAnchorPosType>({
    x: 0,
    y: 0,
    latitude: 0,
    longitude: 0,
  });
  const [distanceFromMyPos, setDistanceFromMyPos] = useState<{
    roundD: number;
    distanceText: string;
  }>({ roundD: 0, distanceText: '' });

  //each marker
  const [isOpenMarker, setIsOpenMarker] = useState<boolean>(false);
  const [markerInfo, setMarkerInfo] = useState<any>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        const coord = info.coords;
        setMyPosition(coord);
        setCenterPos(coord);
      },
      console.error,
      {
        enableHighAccuracy: true,
        timeout: 20000,
      },
    );
  }, [goMyCurrentPos]);

  const onMapClick = (e: myAnchorPosType) => {
    //x,y 기준 left, top
    const { x, y, latitude, longitude } = e;
    setIsMakingAnchor(true);
    setMyAnchorPos(e);

    //센터 위치 변경
    const coord = { latitude, longitude };
    setCenterPos(coord);

    // 내 위치로부터 거리
    const distanceInfo = CalDistance({
      lat1: myPosition.latitude,
      lon1: myPosition.longitude,
      lat2: latitude,
      lon2: longitude,
    });
    setDistanceFromMyPos(distanceInfo);
  };

  const onShareMyView = () => {
    setIsMakingAnchor(false);
    setMyAnchorPos({ x: 0, y: 0, latitude: 0, longitude: 0 });
    if (distanceFromMyPos.roundD < 0.5) {
      navigation.navigate('ShareMyView', { myAnchorPos });
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NaverMapView
        style={{ width: '100%', height: '100%', backgroundColor: 'teal' }}
        rotateGesturesEnabled={true}
        tiltGesturesEnabled={false}
        showsMyLocationButton={false}
        zoomGesturesEnabled={true}
        zoomControl={false}
        maxZoomLevel={20}
        minZoomLevel={10}
        onCameraChange={(e) => console.log(JSON.stringify(e))}
        onMapClick={onMapClick}
        center={{
          zoom: 17,
          latitude: centerPos.latitude,
          longitude: centerPos.longitude,
        }}
        logoGravity={16}>
        <Marker
          coordinate={{
            latitude: myPosition?.latitude,
            longitude: myPosition?.longitude,
          }}
          width={60}
          height={60}
          image={require('../../assets/penguin.png')}
          caption={{
            text: '내 위치',
          }}
        />

        {markerList.map((marker) => (
          <View key={marker.title}>
            <Marker
              coordinate={marker.coord}
              pinColor="black"
              onClick={() => {
                setMarkerInfo(marker);
                setIsOpenMarker(true);
              }}
              caption={{
                text: marker.title,
              }}
            />
          </View>
        ))}
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
            caption={{
              text: `${distanceFromMyPos.distanceText}`,
              requestedWidth: 60,
            }}
          />
        )}
      </NaverMapView>
      {isOpenMarker && (
        <View
          style={{
            width: screenWidth - 40,
            height: 200,
            alignSelf: 'center',
            position: 'absolute',
            top: 100,
            backgroundColor: 'white',
          }}>
          <Video
            source={{ uri: markerInfo?.videoInfo.sourceURL }}
            style={{ width: 200, height: 100 }}
          />
          <Text>{markerInfo?.title}</Text>
          <Text>{markerInfo?.content}</Text>
          <TouchableOpacity onPress={() => setIsOpenMarker(false)}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      )}
      {isMakingAnchor && (
        <>
          {distanceFromMyPos.roundD < 0.5 && (
            <TouchableOpacity
              onPress={onShareMyView}
              style={{
                width: screenWidth * 0.5,
                height: 40,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 130,
                alignSelf: 'center',
                borderRadius: 6,
                shadowOpacity: 0.5,
                shadowOffset: { width: 1, height: 1 },
              }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                내 시야공유하기
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('RequestView', { myAnchorPos })}
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
              시야 공유 요청하기
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
