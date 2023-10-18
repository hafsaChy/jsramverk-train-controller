import React from 'react';
import { RefreshControl, Text, ScrollView } from 'react-native';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { Base, Typography } from '../styles/index.js';


export default function Tabell({ stationDelays, getStationFunction }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    getStationFunction();
  };

    const list = stationDelays.map((station: { AdvertisedLocationName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal; AdvertisedTimeAtLocation: string | any[]; EstimatedTimeAtLocation: string | any[]; }, index: Key) => {
        return <Text key={index} style={Base.box1}>
                <Text style={Typography.header2Tabell}>{" "} { station.AdvertisedLocationName }</Text>{"\n"}
                  <Text style={Base.text2Tabell}>
                   {" "} Avgång:                { station.AdvertisedTimeAtLocation.slice(11,19) }{"\n"}
                   {" "} Försenad till:       { station.EstimatedTimeAtLocation.slice(11,19) }{"\n"}
                  </Text>
                </Text>
  });
    return (
      <ScrollView style={Base.containerTabell}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
      }>
        {list}
      </ScrollView>
    );
};
