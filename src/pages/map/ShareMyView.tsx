import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import NavBase from '../../components/base/NavBase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/StackParams';
import { screenWidth } from '../../utils/css';
import ReactNativeModal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { markerListStatus, setMarkerList } from '../../redux/marker';

interface IShareMyView {
  navigation: NativeStackNavigationProp<RootStackParams>;
  route: {
    params: {
      myAnchorPos: any;
    };
  };
}

const ShareMyView = ({
  navigation,
  route: {
    params: { myAnchorPos },
  },
}: IShareMyView) => {
  //props
  const { latitude, longitude } = myAnchorPos;
  //redux
  const dispatch = useAppDispatch();
  const markerList = useAppSelector(markerListStatus);
  //state
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [videoInfo, setVideoInfo] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const openVideoPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'video',
    }).then((video) => {
      const { duration, mime, sourceURL } = video;
      if (Number(duration) + 1000 > 20000) {
        Alert.alert('20초 이하의 영상만 업로드 가능합니다.');
      } else {
        setVideoInfo(video);
      }
    });
  };

  const onRegisterMyView = () => {
    setIsUploading(true);
    try {
      const createdAt = Date.now();
      const data = {
        title,
        content,
        videoInfo,
        coord: { latitude, longitude },
        createdAt,
        owner: 'me',
      };
      const updated = [data, ...markerList];
      dispatch(setMarkerList(updated));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <NavBase
      title="내 시야 공유"
      closeType={true}
      headerRight={
        videoInfo && (
          <TouchableOpacity onPress={onRegisterMyView}>
            <Text style={{ color: 'blue' }}>등록</Text>
          </TouchableOpacity>
        )
      }>
      {isUploading && <ActivityIndicator />}
      {!videoInfo ? (
        <TouchableOpacity
          onPress={openVideoPicker}
          style={{
            width: screenWidth - 40,
            height: screenWidth - 40,
            borderWidth: 0,
            borderColor: '#99999',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            top: screenWidth / 2,
          }}>
          <FastImage
            source={require('../../assets/video.png')}
            style={{ width: 200, height: 200 }}
          />
          <Text>클릭해서 영상 업로드 하기</Text>
          <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 30 }}>
            20초 이하의 주변 영상을
          </Text>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            공유 해보세요!!
          </Text>
        </TouchableOpacity>
      ) : (
        <KeyboardAwareScrollView>
          <View style={{ width: screenWidth }}>
            <TouchableOpacity
              onPress={() => setVideoInfo(null)}
              style={{ alignSelf: 'flex-end', marginRight: 20 }}>
              <Text style={{ fontSize: 16, color: 'red', fontWeight: '600' }}>
                삭제
              </Text>
            </TouchableOpacity>
            <Video
              source={{ uri: videoInfo?.sourceURL }}
              style={{
                width: screenWidth,
                height: (screenWidth * 3) / 4,
                marginTop: 20,
              }}
              onError={(error) => console.log('error', error)}
              controls={true}
              onLoad={(e) => console.log('onLoad', e)}
              // onProgress={(e) => console.log('onProgress', e)}
            />
          </View>
          <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
            <Text style={{ color: '#999999' }}>제목</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={{
                fontSize: 16,
                marginTop: 10,
                borderBottomWidth: 0.3,
                borderBottomColor: '#999999',
                paddingBottom: 4,
                lineHeight: 24,
              }}
              maxLength={30}
            />
            <Text style={{ color: '#999999', marginTop: 40 }}>내용</Text>
            <TextInput
              value={content}
              onChangeText={setContent}
              style={{
                fontSize: 16,
                marginTop: 10,
                borderBottomWidth: 0.3,
                borderBottomColor: '#999999',
                paddingBottom: 4,
                lineHeight: 24,
              }}
              multiline={true}
              maxLength={500}
            />
            <Text
              style={{
                alignSelf: 'flex-end',
                marginTop: 4,
                color: '#999999',
                fontSize: 12,
              }}>
              {content.length} / 500
            </Text>
          </View>
          <View style={{ height: 200 }} />
        </KeyboardAwareScrollView>
      )}
    </NavBase>
  );
};

export default ShareMyView;

const styles = StyleSheet.create({
  modalEachBox: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  modalEachText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
