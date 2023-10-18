import React from 'react';
import { Text, View, ScrollView, Button, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal} from 'react';
import trafik from '../models/trafik'
import favorit from '../models/favorit'
import { Base, Forms, Typography } from '../styles/index.js';
import authModel from '../models/auth'

export default function Sparade({setIsLoggedIn}) {
  const [station, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState([]);
  const [favStations, setFavstations] = useState<Object>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async() => {
    setFavstations(await favorit.getFavs());
  }

  async function getStations(){
    setStations(await trafik.getStations());
  }

  async function postFavs(artefact: any[]){
    await favorit.saveFavs(artefact);
  }

  async function getFavs(){
    setFavstations(await favorit.getFavs());
  }

  useEffect(() => {
    getStations();
    getFavs();
  }, []);

  const itemsList = station.map((prod, index) => {
    return <Picker.Item key={index} label={prod.AdvertisedLocationName} value={prod.AdvertisedLocationName} style={{fontSize: 20}} />;
  });

  const list = favStations.map((station: { AdvertisedLocationName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal; AdvertisedTimeAtLocation: string | any[]; EstimatedTimeAtLocation: string | any[]; }, index: Key) => {
    return <Text key={index} style={Base.box1}>
           <Text style={Typography.header2Tabell}>{ station.AdvertisedLocationName }</Text>{"\n"}
            Avgång : { station.AdvertisedTimeAtLocation.slice(11,19) }{"\n"}
            Försenad till: { station.EstimatedTimeAtLocation.slice(11,19) }{"\n"}
            </Text> });


    return (
      <ScrollView style={Base.containerTabell}
        refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
      }>
        <Picker
            style={{ color: 'white', backgroundColor: '#15171c' }}
            selectedValue={selectedStation}
            onValueChange={(itemValue) => {
                setSelectedStation(itemValue);
            }}>
        {itemsList}
        </Picker>
        <Button title="Lägg till Favorit" color="#2870F0" onPress={() => {
                      postFavs(selectedStation);
                    }}
                />
        <Text></Text>
        <Text style={Typography.header3Map}> Favoritstationer</Text>
        { list }
        <Button title={"Logga ut"} color="#2870F0" onPress={() => {
                          authModel.logout();
                          setIsLoggedIn(false);
                    }}/>
      </ScrollView>
    );
};
