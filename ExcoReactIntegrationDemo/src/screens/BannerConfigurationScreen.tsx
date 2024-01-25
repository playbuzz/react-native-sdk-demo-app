import { View, Text, StyleSheet } from 'react-native';
import { OptionButton } from '../views/OptionButton'
import React from 'react';
import { ExcoPlayerPosition } from  '@gini-npm/react-native-exco-player'

const styles = StyleSheet.create({
  textMain: {
    fontSize: 24,
    color: '#000',
    paddingVertical: 16
  },
  textAbout: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 16
  },
  container:{
    margin: 24
  }
});

export const BannerConfigurationScreen = ({ navigation, route}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#12339A', 
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

    return (
      <View style={styles.container}>
        <Text style={styles.textMain} >
          MiniPlayer Selection Method
        </Text>
        <Text style={styles.textAbout} >
          Select MiniPlayer Type
        </Text>
        <OptionButton
            buttonText="Banner Top"
            onClickNavigate={() => navigation.navigate('PlayerScreen',{miniPlayerType:ExcoPlayerPosition.BANNER_TOP, ...route.params})}>
        </OptionButton>
        <OptionButton
            buttonText="Banner Bottom"
            onClickNavigate={() => navigation.navigate('PlayerScreen',{miniPlayerType:ExcoPlayerPosition.BANNER_BOTTOM, ...route.params})}>
        </OptionButton>
      </View>
    );
  };
  