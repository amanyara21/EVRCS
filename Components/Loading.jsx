import LoaderKit from 'react-native-loader-kit'
import {View,Dimensions} from 'react-native'
export default function Loading({color}) {
  return (
    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, position:'relative' }}>
      <LoaderKit
        style={{ width: 100, height: 100, position:'absolute', left:'40%', top:'40%' }}
        name={'BallClipRotateMultiple'} 
        color={color}
      />
    </View>
  );
}