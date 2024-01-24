import { View, Text, StyleSheet } from "react-native";
import { SelectionCard } from '../views/SelectionCard.tsx';
import React from "react";

const styles = StyleSheet.create({
  textMain: {
    fontSize: 24,
    color: 'black',
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  textAbout: {
    fontSize: 16,
    color: 'black',
    padding: 24,
    textAlign: 'center',
  },
  containerMain: {
    flex:1,
    color: 'white'
  }
});

export const IntroductionScreen = ({ navigation }) => {
  return (
    <View style={styles.containerMain}>
      <Text style={styles.textMain} >
        Hey
      </Text>
      <Text style={styles.textMain} >
        Welcome to Exco App
      </Text>
      <Text style={styles.textAbout} >
        Here you сan you see how the ExCoPlayer looks in different configurations.
      </Text>
      <SelectionCard
          selectionName="Configuration"
          selectionAbout="To see how the player, please move forward and set player Configuration"
          onSelectionClick={() => navigation.navigate('PlayerAttributesConfigurationScreen')}>
      </SelectionCard>
    </View>
  );
};