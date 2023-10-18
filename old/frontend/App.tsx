import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import Tabell from './components/Tabell';
import Map from './components/Map';
import Auth from "./components/auth/Auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import Sparade from './components/Sparade'
import { Base, Typography } from './styles/index.js';
import authModel from './models/auth';
import trafik from './models/trafik';

const Tab = createBottomTabNavigator();

interface routeIcons {
  "Förseningar": String;
  "Karta": String;
  "Logga in": String;
  "Favoriter": String;
}

const routeIcons = {
  "Förseningar": "train-outline",
  "Karta": "map-outline",
  "Logga in": "log-in-outline",
  "Favoriter": "heart"
};

export default function App() {
  const [stationDelays, setStationDelays] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  const getStationFunction = async () => {
    setStationDelays(await trafik.getDelaysByStations());
  };

  const getLoggedIn = async () => {
    setIsLoggedIn(await authModel.loggedIn());
  };

  useEffect(() => {
    getLoggedIn();
    getStationFunction();
  }, [])

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarStyle:{
            backgroundColor:'#20232a',
          },
          tabBarItemStyle:{
            margin:5,
            borderRadius:10,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = routeIcons[route.name] || "alert";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#03a9f4',
          tabBarInactiveTintColor: 'gray',
          })}
          >
          <Tab.Screen name="Förseningar" options={{headerStyle: {
            backgroundColor: '#20232a',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },}} >
            {() => <Tabell stationDelays={stationDelays} getStationFunction={getStationFunction} />}
            </Tab.Screen>

            <Tab.Screen name="Karta"options={{headerStyle: {
            backgroundColor: '#20232a',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },}} >
            {() => <Map stationDelays={stationDelays} />}
            </Tab.Screen>

            {isLoggedIn ?
            <Tab.Screen name="Favoriter"options={{headerStyle: {
            backgroundColor: '#20232a',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },}} >
            {() => <Sparade setIsLoggedIn={setIsLoggedIn}/>}
            </Tab.Screen>
            :

            <Tab.Screen name="Logga in"options={{headerStyle: {
              backgroundColor: '#20232a',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
              },}}>
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }

        </Tab.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};
