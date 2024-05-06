import React, { Component, useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SelectionNextCard } from '../views/SelectionCard';
import { ExcoPlayerPosition } from '@exco-npm/react-native-exco-player';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';

import { NativeModules } from 'react-native';
const IfaModule = NativeModules.IfaModule;
const Styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      backgroundColor: '#fff',
    },
    keyboardAvoidingContainer: {
      flex: 1,
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
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#000',
      marginRight: 10,
    },
    checked: {
      backgroundColor: '#000',
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

export const InputCheckBox = ({ inputName, toggleCheckbox, isChecked }) => {
  return (
    <View style={Styles.inputCardContainer}>
      <Text style={Styles.inputCardHeaderText}>{inputName}</Text>
      <TouchableOpacity onPress={toggleCheckbox} style={Styles.checkboxContainer}>
        <View style={[Styles.checkbox, isChecked && Styles.checked]} />
      </TouchableOpacity>
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
  const [playerId, setPlayerId] = useState('85958501-aa63-4317-b103-5ea9f3a276f8');
  const [appCategory, setAppCategory] = useState('Sport, Movie');
  const [appStoreUrl, setAppStoreUrl] = useState('https://appStoreUrl');
  const [appStoreId, setAppStoreId] = useState('412491294123');
  const [isChecked, setIsChecked] = useState(false);
  const [loggerIsChecked, setLoggerIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const toggleLoggerCheckbox = () => {
    setLoggerIsChecked(!loggerIsChecked);
  };
  const [appVersion, setAppVersion] = useState('1.0.1');
  const [appDevices, setAppDevices] = useState('Pixel 6');
  const [ifa, setIfa] = useState('');

  
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (IfaModule) {
        IfaModule.getAdvertisingId((ifa) => {
          setIfa(ifa);
        });
      }
    } else if (Platform.OS === 'ios'){
      ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) =>
        !res.isAdTrackingLimited ? setIfa(res.id) : setIfa(''),
      )
      .catch((err) => {
        console.log(err);
        setIfa('');
      })
    }
  }, []);

  
  const navigateNextScreen = () => {
    navigation.navigate('PlayerScreen',{
      playerId:playerId,
      appCategory:appCategory,
      appStoreId:appStoreId,
      appStoreUrl:appStoreUrl,
      appVersion:appVersion,
      appDevices:appDevices,
      ifa:ifa,
      miniPlayerType: ExcoPlayerPosition.NONE,
      isProgrammatic: isChecked,
      Logger:loggerIsChecked
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
          readOnly={false}
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
        <InputCheckBox
          inputName="isProgrammatic"
          toggleCheckbox={toggleCheckbox}
          isChecked={isChecked}
        />
         <InputCheckBox
          inputName="Logger"
          toggleCheckbox={toggleLoggerCheckbox}
          isChecked={loggerIsChecked}
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
