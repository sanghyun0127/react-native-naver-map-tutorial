import {
  ScrollView,
  StyleSheet,
  Text,
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
  const { latitude, longitude } = myAnchorPos;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openVideoPicker = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'video',
    }).then((video) => {
      console.log(video);
    });
  }, []);

  return (
    <NavBase title="내 시야 공유" closeType={true}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{
            width: screenWidth - 40,
            height: 160,
            borderWidth: 1,
            borderColor: '#99999',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>20초 이하의 주변 영상을 공유 해보세요!!</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <ReactNativeModal
        isVisible={isModalVisible}
        style={{ margin: 0 }}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View
          style={{
            width: screenWidth * 0.8,
            borderRadius: 12,
            backgroundColor: 'white',
            alignSelf: 'center',
          }}>
          <TouchableOpacity activeOpacity={0.5} style={styles.modalEachBox}>
            <Text style={styles.modalEachText}>사진 업로드</Text>
          </TouchableOpacity>
          <View style={{ height: 0.5, backgroundColor: '#999999' }} />
          <TouchableOpacity activeOpacity={0.5} style={styles.modalEachBox}>
            <Text style={styles.modalEachText}>동영상 업로드</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal> */}
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
