import { View, Text, StyleSheet } from "react-native";
import { SelectionCard } from '../views/SelectionCard.tsx';
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

export const MiniPlayerConfigurationScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.textMain} >
        CornerPlacement
      </Text>
      <Text style={styles.textAbout} >
        Select Position for Corner
      </Text>
      <SelectionCard
          selectionName="Corner"
          selectionAbout="MiniPlayer will be placed in corner of whole screen"
          onSelectionClick={() => navigation.navigate('MiniPlayerCornerConfigurationScreen')}>
      </SelectionCard>
      <SelectionCard
          selectionName="Banner"
          selectionAbout="MiniPlayer with style Banner will be placed in bottom or top of whole screen"
          onSelectionClick={() => navigation.navigate('BannerConfigurationScreen')}>
       </SelectionCard>
       <SelectionCard
          selectionName="None"
          selectionAbout="Player without MiniPlayer"
          onSelectionClick={() => navigation.navigate('PlayerScreen',{miniPlayerType: -1 })}>
      </SelectionCard>
    </View>
  );
};