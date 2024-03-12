import React from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { 
  ExcoPlayerView , 
  ExcoPlayerViewControlDelegate, 
  ExcoPlayerViewErrorDelegate, 
  ExcoPlayerViewAdDelegate
 } from '@exco-npm/react-native-exco-player';

const TextUtils = {
  DUMMY_TEXT: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum. Nullam non nisi est sit amet facilisis magna etiam.
    Lacinia quis vel eros donec ac odio tempor orci dapibus. Tempor orci dapibus ultrices in iaculis nunc sed augue. Aliquet nibh praesent tristique magna sit amet purus.
  `,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  playerContainer: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAreaContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  player: {
    width: 320,
    height: 180,
  }
});



export const PlayerScreen = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#12339A', 
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  const { 
    miniPlayerType,
    playerId,
    appCategory,
    appStoreId,
    appStoreUrl,
    appVersion,
    appDevices,
    ifa
  } = route.params;

  const appCategoryArray = appCategory.split(',').map((category: string) => category.trim());

  const scrollState = new Animated.Value(0);

  const delegateControl = new ExcoPlayerViewControlDelegate(
    () => console.log('Player Initiated'),
    () => console.log('Player Loaded'),
    () => console.log('Player Playing'),
    () => console.log('Player Paused'),
    () => console.log('Player Muted'),
    () => console.log('Player Unmuted'),
    () => console.log('Player Closed'),
    () => console.log('Player DidFailLoading'),
    () => console.log('Player DidFinishLoading'),
    () => console.log('Player PlayerClickedCTA'),
    () => console.log('Player PlayerEnterFullScreen'),
    () => console.log('Player PlayerExitFullScreen'),
    () => console.log('Player UnknownEvent'),
  );
    const delegateError = new ExcoPlayerViewErrorDelegate(
      (payload) => console.log('error message: ' + payload)
    );
    const delegateAds = new ExcoPlayerViewAdDelegate(
      () => console.log('Player Ad Init'),
      () => console.log('Player Ad Started'),
      (payload) => console.log('Player Ad Impression ' + payload),
      () => console.log('Player Ad FirstQuartile'),
      () => console.log('Player Ad Midpoint'),
      () => console.log('Player Ad ThirdQuartile'),
      () => console.log('Player Ad Completed'),
      () => console.log('Player Ad Clicked'),
      () => console.log('Player Ad Skipped'),
    );
    
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={
            Animated.event([{ nativeEvent: { contentOffset: { y: scrollState } } }],
            { useNativeDriver: false } 
          )}>
          <View style={styles.playerContainer}>
            <ExcoPlayerView 
              nativeConfig = { { 
                playerID: playerId,
                appCategories : appCategoryArray,
                appStoreId: appStoreId,
                appStoreUrl: appStoreUrl,
                appVersion: appVersion,
                deviceId: appDevices,
                ifa : ifa,
                playerType : miniPlayerType,
              } } 
              style = {styles.player}
              delegateControl = {delegateControl}
              delegateAds = {delegateAds}
              delegateErrors = {delegateError}
            />
          </View> 
          <View style={styles.textAreaContainer}>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};