import { View, Text, StyleSheet } from "react-native";
import { OptionButton } from '../views/OptionButton.tsx';
import React from "react";
// import { MiniPlayerPosition } from  '@gini-npm/exco-react-native-sdk/ExCoSDK.tsx'

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

export const MiniPlayerCornerConfigurationScreen = ({ navigation }) => {
    return (
      <View>
        <Text style={styles.textMain} >
          MiniPlayer Selection Method
        </Text>
        <Text style={styles.textAbout} >
          Select MiniPlayer Type
        </Text>
        <OptionButton
            buttonText="Top Left"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:1})}>
        </OptionButton>
        <OptionButton
            buttonText="Top Right"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:0})}>
        </OptionButton>
        <OptionButton
            buttonText="Bottom Left"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:3})}>
        </OptionButton>
        <OptionButton
            buttonText="Bottom Right"
            onClickNavigate={ () => navigation.navigate('PlayerScreen',{miniPlayerType:2})}>
        </OptionButton>
      </View>
    );
  };