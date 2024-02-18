import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SelectionNextCard } from '../views/SelectionCard';

const Styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      backgroundColor: '#fff',
    },
    keyboardAvoidingContainer: {
      flex: 1,
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'space-around',
    },
    header: {
      fontSize: 36,
      marginBottom: 48,
    },
    textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    btnContainer: {
      backgroundColor: 'white',
      marginTop: 12,
    },
    appbar: {
      backgroundColor: '#12339A',
    },
    headerText: {
      color: 'black',
      fontSize: 14,
      fontWeight: '500',
    },
    input: {
      marginTop: 8,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      height: 55,
      padding: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    buttonNext: {
      marginTop: 50,
      height: 40,
    },
    inputCardContainer: {
      marginTop: 20,
    },
    inputButtonContainer: {
      marginVertical: 30,
    },
    inputCardHeaderText: {
      color: 'black',
      fontSize: 14,
      fontWeight: '500',
    },
    inputCardInput: {
      marginTop: 8,
      borderWidth: 1,
      borderColor: '#D1D5DB',
      height: 55,
      padding: 8,
      color: 'black'
    },
  });

const InputCard = ({ inputName, inputTip, inputText, readOnly, changeValue }) => {
  return (
    <View style={Styles.inputCardContainer}>
      <Text style={Styles.inputCardHeaderText}>{inputName}</Text>
      <TextInput
        value={inputText}
        onChangeText={changeValue}
        editable={!readOnly}
        placeholder={inputTip}
        style={Styles.inputCardInput}
      />
    </View>
  );
};
  
export const PlayerAttributesConfigurationScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#12339A', 
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  const appName = DeviceInfo.getApplicationName()
  const yourAppBundle = "YourAppBundle"
  const [playerId, setPlayerId] = useState('8bd39116-eacb-4b4e-a160-bedd5d71ce1c');
  const [appCategory, setAppCategory] = useState('Sport, Movie');
  const [appStoreUrl, setAppStoreUrl] = useState('https://appStoreUrl');
  const [appStoreId, setAppStoreId] = useState('412491294123');

  const [appVersion, setAppVersion] = useState('1.0.1');
  const [appDevices, setAppDevices] = useState('Pixel 6');
  const [ifa, setIfa] = useState('19421jfas9f214jfs');

  const navigateNextScreen = () => {
    navigation.navigate('MiniPlayerConfigurationScreen',{
      playerId:playerId,
      appCategory:appCategory,
      appStoreId:appStoreId,
      appStoreUrl:appStoreUrl,
      appVersion:appVersion,
      appDevices:appDevices,
      ifa:ifa
    })
  };

  return (
    <View style={Styles.container}>
      <KeyboardAvoidingView
              style={Styles.keyboardAvoidingContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
              >
      <ScrollView style = {{padding:0}}>
        <InputCard
          inputName="AppName"
          inputTip="AppName"
          inputText={appName} 
          readOnly={true}
          changeValue={undefined}
        />
        <InputCard
          inputName="AppBundle"
          inputTip="AppBundle"
          inputText={yourAppBundle}
          readOnly={true}
          changeValue={undefined}          
        />
        <InputCard
          inputName="PlayerId"
          inputTip="Enter your unique player ID"
          inputText={playerId}
          readOnly={true}
          changeValue={setPlayerId}
        />
        <InputCard
          inputName="App category"
          inputTip="Select your app's category"
          inputText={appCategory}
          readOnly={false}
          changeValue={setAppCategory}
        />
        <InputCard
          inputName="App Store URL"
          inputTip="Enter your app's store URL"
          inputText={appStoreId}
          readOnly={false}
          changeValue={setAppStoreId}
        />
        <InputCard
          inputName="App Store Id"
          inputTip="Enter your app's store Id"
          inputText={appStoreUrl}
          readOnly={false}
          changeValue={setAppStoreUrl}
        />
        <InputCard
          inputName="App Version"
          inputTip="Enter your app's version number"
          inputText={appVersion}
          readOnly={false}
          changeValue={setAppVersion}
        />
        <InputCard
          inputName="App Devices"
          inputTip="Select supporter devices"
          inputText={appDevices}
          readOnly={false}
          changeValue={setAppDevices}
        />
        <InputCard
          inputName="IFA"
          inputTip="Enter your IFA"
          inputText={ifa}
          readOnly={false}
          changeValue={setIfa}
        />
        <View style={Styles.inputButtonContainer}>
          <SelectionNextCard
            selectionName="Next"
            onSelectionClick={() => navigateNextScreen()}>
          </SelectionNextCard>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};


export default PlayerAttributesConfigurationScreen;
