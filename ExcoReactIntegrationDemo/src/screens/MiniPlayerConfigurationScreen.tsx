import { View, Text, StyleSheet } from "react-native";
import { SelectionCard } from '../views/SelectionCard.tsx';
import React from "react";
import { ExcoPlayerPosition } from  '@gini-npm/react-native-exco-player'

const styles = StyleSheet.create({
  textMain: {
    fontSize: 24,
    color: '#000',
    padding:16
  },
  textAbout: {
    fontSize: 18,
    color: '#000',
    padding:16
  },
});

export const MiniPlayerConfigurationScreen = ({ route, navigation }) => {

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
          onSelectionClick={() => navigation.navigate('MiniPlayerCornerConfigurationScreen',{...route.params,})}>
      </SelectionCard>
      <SelectionCard
          selectionName="Banner"
          selectionAbout="MiniPlayer with style Banner will be placed in bottom or top of whole screen"
          onSelectionClick={() => navigation.navigate('BannerConfigurationScreen',{...route.params,})}>
       </SelectionCard>
       <SelectionCard
          selectionName="None"
          selectionAbout="Player without MiniPlayer"
          onSelectionClick={() => navigation.navigate('PlayerScreen',{miniPlayerType: ExcoPlayerPosition.NONE, ...route.params,})}>
      </SelectionCard>
    </View>
  );
};