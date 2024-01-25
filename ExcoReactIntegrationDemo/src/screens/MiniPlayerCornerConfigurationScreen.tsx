import { View, Text, StyleSheet } from "react-native";
import { OptionButton } from '../views/OptionButton.tsx';
import React from "react";
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

export const MiniPlayerCornerConfigurationScreen = ({ navigation, route}) => {
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
            buttonText="Top Left"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:ExcoPlayerPosition.CORNER_TOP_LEFT,...route.params})}>
        </OptionButton>
        <OptionButton
            buttonText="Top Right"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:ExcoPlayerPosition.CORNER_TOP_RIGHT,...route.params})}>
        </OptionButton>
        <OptionButton
            buttonText="Bottom Left"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:ExcoPlayerPosition.CORNER_BOTTOM_LEFT,...route.params})}>
        </OptionButton>
        <OptionButton
            buttonText="Bottom Right"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:ExcoPlayerPosition.CORNER_BOTTOM_RIGHT,...route.params})}>
        </OptionButton>
      </View>
    );
  };