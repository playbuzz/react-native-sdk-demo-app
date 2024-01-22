import { View, Text, StyleSheet } from 'react-native';
import { OptionButton } from '../views/OptionButton'
import { MiniPlayerPosition } from  '@gini-npm/exco-react-native-sdk/ExCoSDK.tsx'

const styles = StyleSheet.create({
    textMain: {
      fontSize: 18,
      color: '#000',
      padding: 24
    },
    textAbout: {
      fontSize: 14,
      color: '#000',
      paddingStart: 24
    },
  });

export const BannerConfigurationScreen = ({ navigation }) => {
    return (
      <View>
        <Text style={styles.textMain} >
          MiniPlayer Selection Method
        </Text>
        <Text style={styles.textAbout} >
          Select MiniPlayer Type
        </Text>
        <OptionButton
            buttonText="Banner Top"
            onClickNavigate={() => navigation.navigate('PlayerScreen',{miniPlayerType:MiniPlayerPosition.MINI_PLAYER_BANNER_TOP})}>
        </OptionButton>
        <OptionButton
            buttonText="Banner Bottom"
            onClickNavigate={() => navigation.navigate('PlayerScreen',{miniPlayerType:MiniPlayerPosition.MINI_PLAYER_BANNER_BOTTOM})}>
        </OptionButton>
      </View>
    );
  };
  