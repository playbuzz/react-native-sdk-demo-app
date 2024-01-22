import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { ExCoPlayerView } from  '@gini-npm/exco-react-native-sdk/ExCoSDK.tsx'

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
});


export const PlayerScreen = ({ route, navigation }) => {
    const [ scrollState, setScrollState ] = useState(new Animated.Value(0));
    const { miniPlayerType } = route.params;
  
    const handlePlayerEvent = (eventData:any) => {
      console.log('ExCoPlayerEvent:', eventData);
    };
    const handlePlayerError = (eventData:any) => {
      console.log('ExCoPlayerError', eventData);
    };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollState } } }])}>
          <View style={styles.playerContainer}>
            <ExCoPlayerView
              padding={15}
              playerID="8bd39116-eacb-4b4e-a160-bedd5d71ce1c"
              appCategoryArray={["Sport", "Game", "Television", "AI", "Investments"]}
              appStoreId="yourAppStoreId"
              appStoreUrl="yourAppStoreUrl"
              appVersion="yourAppVersion"
              deviceId="yourDeviceId"
              ifa="yourIFA"
              miniPlayerType={miniPlayerType}
              onPlayerEvent={handlePlayerEvent}
              onPlayerError={handlePlayerError}
            />
          </View>
          <View style={styles.textAreaContainer}>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
            <Text style={styles.text}>{TextUtils.DUMMY_TEXT}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
};