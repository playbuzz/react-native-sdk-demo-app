import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SelectionCard = ({ selectionName, selectionAbout, onSelectionClick }) => {
  return (
    <TouchableOpacity onPress={onSelectionClick} style={styles.card}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.selectionName}>{selectionName}</Text>
        </View>
        <Text style={styles.selectionAbout}>{selectionAbout}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#12339A',
    margin: 16,
    padding: 16,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  selectionName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  selectionAbout: {
    color: '#8295C6',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default SelectionCard;
