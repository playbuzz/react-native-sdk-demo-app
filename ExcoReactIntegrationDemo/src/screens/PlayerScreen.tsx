import React, { useRef, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Animated, Button, FlatList } from 'react-native';
import { 
  ExcoPlayerView , 
  ExcoPlayerViewControlDelegate, 
  ExcoPlayerViewErrorDelegate, 
  ExcoPlayerViewAdDelegate,
  ConfigurationOptions
 } from '@exco-npm/react-native-exco-player';
 import DeviceInfo from 'react-native-device-info';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const TextUtils = {
  DUMMY_TEXT: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum. Nullam non nisi est sit amet facilisis magna etiam.
    Lacinia quis vel eros donec ac odio tempor orci dapibus. Tempor orci dapibus ultrices in iaculis nunc sed augue. Aliquet nibh praesent tristique magna sit amet purus.
  `,
};
const isTablet = DeviceInfo.isTablet();

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
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#666',
  },
  eventType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#666',
  },
  eventPayload: {
    fontSize: 14,
    color: '#666',
    marginRight:150
  },
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
    ifa,
    isProgrammatic,
    Logger
  } = route.params;
  
  const configOptions: ConfigurationOptions = {
    content: {
      playFirst: [
          {
              id: "fa375-264b-4a86-809c-bbfc191532c1",
              src: "https://mcd.ex.co/video/upload/v1490095101/landscape7a6fa375-264b-4a86-809c-bbfc191532c1.mp4",
          },
          {
              id: "fa375-264b-4a86-809c-bbfc191532c2",
              src: "https://mcd.ex.co/video/upload/v1490095101/landscape7a6fa375-264b-4a86-809c-bbfc191532c1.mp4",
          },
      ],
      replacePlaylist: false,
      tags: ["Sport", "Cinema"],
      playlist: [
          {
              id: "fa375-264b-4a86-809c-bbfc191532c1",
              src: "https://mcd.ex.co/video/upload/v1490095101/landscape7a6fa375-264b-4a86-809c-bbfc191532c1.mp4",
          },
          {
              id: "fa375-264b-4a86-809c-bbfc191532c2",
              src: "https://mcd.ex.co/video/upload/v1490095101/landscape7a6fa375-264b-4a86-809c-bbfc191532c1.mp4",
          },
      ],
  },
    playbackMode: 'auto-play',
    autoPlay: false,
    mute: false,
    showAds: true,
    customParams: {
        customColor: "red",
    },
 };
  const appCategoryArray = appCategory.split(',').map((category: string) => category.trim());

  const scrollState = new Animated.Value(0);
  
  const [events, setEvents] = useState<{ eventType: string; payload?: any }[]>([]);

  const delegateControl = new ExcoPlayerViewControlDelegate(
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Initiated' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Loaded' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Playing' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Paused' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Muted' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Unmuted' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Closed' }]),
    () => console.log("PlayerDidFailLoading:"),  
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player `DidFinishLoading' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player PlayerClickedCTA' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player PlayerEnterFullScreen' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player PlayerExitFullScreen' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player UnknownEvent' }]),
    (payload) => setEvents(prevEvents => [...prevEvents, { eventType: 'Player GenericEvent', payload }]),
  );
  
  const delegateError = new ExcoPlayerViewErrorDelegate(
    (payload) => console.log("Error:",payload)  
  );
  
  const delegateAds = new ExcoPlayerViewAdDelegate(
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Init' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Started' }]),
    (payload) => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Impression', payload }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad FirstQuartile' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Midpoint' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad ThirdQuartile' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Completed' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Clicked' }]),
    () => setEvents(prevEvents => [...prevEvents, { eventType: 'Player Ad Skipped' }]),
  );
  
  const playerRef = useRef<any>(null);
  const initializeProgrammaticPlayer = () => {
    if (playerRef.current) {
     playerRef.current.initProgrammaticPlayer(configOptions);
    } else {
       console.error("Player ref is not defined.");
    }
  };
    
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
            ref = {playerRef}
            nativeConfig = { { 
              playerID: playerId,
              appCategories : appCategoryArray,
              appStoreId: appStoreId,
              appStoreUrl: appStoreUrl,
              appVersion: appVersion,
              deviceId: appDevices,
              ifa : ifa,
              playerType : miniPlayerType,
              isProgrammatic : isProgrammatic
            } } 
            style = {{
              height: isTablet ? 450 : 180,
              width: isTablet ? 800 : 320
            }}
            delegateControl = {delegateControl}
            delegateAds = {delegateAds}
            delegateErrors = {delegateError}
          />
        </View> 
        {isProgrammatic && <View style={styles.textAreaContainer}>
          <Button title="Player Init" onPress={initializeProgrammaticPlayer} />
        </View>}
      </ScrollView>
        {Logger &&
           <FlatList
           style={{ flex: 1, width: '100%', height: '60%', position: 'absolute', bottom: 0 , backgroundColor:"FFFFFF"}}
           data={events}
           renderItem={({ item }) => (
             <View style={styles.eventItem}>
               <Text style={styles.eventType}>{item.eventType}</Text>
               {item.payload && <Text style={[styles.eventPayload, { flexWrap: 'wrap' }]}>{JSON.stringify(item.payload)}</Text>}
             </View>
           )}
           keyExtractor={(item, index) => index.toString()}
         />
        }
    </SafeAreaView>
  );
};