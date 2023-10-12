import { RefreshControl, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { Base, Typography } from '../styles/index.js';


export default function Tabell({ stationDelays, getStationFunction }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    getStationFunction();
  };

    const list = stationDelays.map((station, index) => {
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
