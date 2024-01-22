import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const stylesOptionButton = StyleSheet.create({
    button: {
      width: '100%',
      padding: 16,
      borderColor: '#12339A',
      borderWidth: 1,
      backgroundColor: '#F0F4FF',
      borderRadius: 16,
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#12339A',
      fontSize: 18,
      fontWeight: '600',
      marginRight: 'auto', 
    },
  });

export const OptionButton = ({ buttonText, onClickNavigate }) => {
    return (
      <TouchableOpacity 
        onPress={onClickNavigate}
        style={stylesOptionButton.button}>
        <View style={stylesOptionButton.buttonContainer}>
          <Text style={stylesOptionButton.buttonText}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    );
  };