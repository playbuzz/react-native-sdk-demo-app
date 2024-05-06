import React, { useRef, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, Animated, Button, FlatList, TextInput, Alert, DimensionValue } from 'react-native';
import { 
  ExcoPlayerView , 
  ExcoPlayerViewControlDelegate, 
  ExcoPlayerViewErrorDelegate, 
  ExcoPlayerViewAdDelegate,
  ConfigurationOptions,
  Playlist,
  IndexObject
 } from '@exco-npm/react-native-exco-player';
 import DeviceInfo from 'react-native-device-info';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Keyboard } from 'react-native';

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
  const height = isProgrammatic ? '45%' : '70%';

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

  const [width, setWidth] = useState('100%');

  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setWidth('0%')
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setWidth('100$')
    }
  );
  
  const convertToDimensionValue = (value: string): DimensionValue | undefined => {
    // Check if the value is a valid percentage string
    const percentagePattern = /^(\d+(\.\d+)?)%$/;
    if (percentagePattern.test(value)) {
      return value as DimensionValue;
    } else {
      // If it's not a percentage, return undefined or other appropriate value
      return undefined;
    }
  };

  // Convert the width string to DimensionValue
  const convertedWidth: DimensionValue | undefined = convertToDimensionValue(width);

  
  const [scrollState] = useState(new Animated.Value(0));
  const playerRef = useRef<any>(null);

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
const index: IndexObject = {
  index: 2
};
const playlistItems: Playlist = {
  index: 1,
  playListItems: [
    {
      id: "1",
      src: "https://mcd.ex.co/video/upload/v1490095101/landscape7a6fa375-264b-4a86-809c-bbfc191532c1.mp4",
      title: "Video 1",
      tags: ["tag1", "tag2"],
      customParams: {
        param1: "value1",
        param2: "value2"
      }
    },
    {
      id: "2",
      src: "https://mcd.ex.co/video/upload/v1490095101/landscape7a6fa375-264b-4a86-809c-bbfc191532c1.mp4",
      title: "Video 2",
      tags: ["tag3", "tag4"],
      customParams: {
        param3: "value3",
        param4: "value4"
      }
    }
  ]
};
const [text, setText] = useState('');

const handleSubmit = () => {
  const intValue = parseInt(text);

  if (!isNaN(intValue)) {
    setPlaylistIndex({ index: intValue });

  } else {
    Alert.alert('Error', 'Please enter a valid integer.');
  }
};

  const initializeProgrammaticPlayer = () => {
    if (playerRef.current) {
      playerRef.current.initProgrammaticPlayer(configOptions);
    } else {
      console.error("Player ref is not defined.");
    }
  };[]
  const pauseProgrammaticPlayerFunc = () => {
    if (playerRef.current) {
      playerRef.current.pauseProgrammaticPlayer()
    } else {
      console.error("Player ref is not defined.");
    }
  };
  const playProgrammaticPlayerFunc = () => {
    if (playerRef.current) {
      playerRef.current.playProgrammaticPlayer()
    } else {
      console.error("Player ref is not defined.");
    }
  };
  const destroyProgrammaticPlayerFunc = () => {
    if (playerRef.current) {
      playerRef.current.destroyProgrammaticPlayer()
    } else {
      console.error("Player ref is not defined.");
    }
  };
  const getContentPositionFunc = () => {
    if (playerRef.current) {
      playerRef.current.getContentPosition()
      .then((position: number) => {
        console.log('Received content position:', position);
      })
      .catch((error: any) => {
        console.log('Error getting content position:', error);
      });
    } else {
      console.log("Player ref is not defined.");
    }
  };
  const getPlaylistIndex = () => {
    if (playerRef.current) {
      playerRef.current.getPlaylistIndex()
      .then((index: number) => {
        console.log('Received PlaylistIndex:', index);
      })
      .catch((error: any) => {
        console.log('Error getting PlaylistIndex:', error);
      });
    } else {
      console.log("Player ref is not defined.");
    }
  };
  const getPlayListItem = () => {
    if (playerRef.current) {
      playerRef.current.getPlaylistItem()
      .then((item: object) => {
        console.log('Received PlayListItem:', item);
      })
      .catch((error: any) => {
        console.log('Error getting PlayListItem:', error);
      });
    } else {
      console.log("Player ref is not defined.");
    }
  };

  const setPlaylistIndex = (index:IndexObject) => {
    if (playerRef.current) {
      playerRef.current.setPlaylistIndexProgrammaticPlayer(index);
    } else {
      console.error("Player ref is not defined or index is not selected.");
    }
  };

  const addPlaylistItems = () => {
    if (playerRef.current) {
      playerRef.current.addPlaylistItemsProgrammaticPlayer(playlistItems);
    } else {
      console.error("Player ref is not defined.");
    }
  };[]  
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
        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginVertical:5 }}>
          <View style={{ width: 100 }}>
            <Button title="Initialize" onPress={initializeProgrammaticPlayer} />
          </View>
          <View style={{ width: 100 }}>
            <Button title="Destroy" onPress={destroyProgrammaticPlayerFunc} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginVertical:5 }}>
          <View style={{ width: 100 }}>
            <Button title="Play" onPress={playProgrammaticPlayerFunc} />
          </View>
          <View style={{ width: 100 }}>
            <Button title="Pause" onPress={pauseProgrammaticPlayerFunc} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginVertical:5 }}>
          <View style={{ width: 100, height:40 }}>
            <TextInput
              style={{ borderColor: 'black', borderWidth: 1, color:'black', textAlign: 'center' }}
              onChangeText={setText}
              value={text}
              placeholder="Enter integer here"
              keyboardType="numeric" // Allow only numeric keyboard
            />
          </View>
          <View style={{ width: 200,height:40 }}>
            <Button title="Set playList Index" onPress={handleSubmit} />
          </View>
        </View>
        </View>}
      </ScrollView>
        {Logger &&
           <FlatList
           style={{ flex: 1, width: convertedWidth, height: height, position: 'absolute', bottom: 0 , backgroundColor:"FFFFFF"}}
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