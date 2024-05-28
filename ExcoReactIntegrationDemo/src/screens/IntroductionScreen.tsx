import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectionCard } from '../views/SelectionCard.tsx';

const styles = StyleSheet.create({
  textMain: {
    fontSize: 24,
    color: 'black',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  textAbout: {
    fontSize: 16,
    color: 'black',
    padding: 24,
    textAlign: 'center',
  },
  containerMain: {
    flex: 1,
    justifyContent: 'space-between', // Align items with space in between
    padding: 24,
  },
  cardContainer: {
    alignSelf: 'flex-end', // Align to the bottom of the container
  },
});

export const IntroductionScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#12339A',
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  return (
    <View style={styles.containerMain}>
      <View>
        <Text style={styles.textMain}>
          Hey
        </Text>
        <Text style={styles.textMain}>
          Welcome to Exco App
        </Text>
        <Text style={styles.textAbout}>
          Here you сan you see how the ExCoPlayer looks in different configurations.
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <SelectionCard
          selectionName="Configuration"
          selectionAbout="To view the player, please proceed and configure the player configuration"
          onSelectionClick={() => navigation.navigate('PlayerAttributesConfigurationScreen')}
        />
      </View>
    </View>
  );
};
