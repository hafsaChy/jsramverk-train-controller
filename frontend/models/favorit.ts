import config from "../config/config.json";
import storage from "./storage";
import trafik from "./trafik"

const favorit = {

    saveFavs: async function saveFav(station) {
        const token = await storage.readToken();
        const data = {
            api_key: config.api_key,
            artefact: station
        };
        await fetch(`https://auth.emilfolino.se/data`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });
    },
    getFavs: async function getFav(){

        const token = await storage.readToken();
        const response = await fetch(`https://auth.emilfolino.se/data?api_key=${config.api_key}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'x-access-token': token.token
            },
        });

        const result = await response.json();
        const delayStatus = await trafik.getDelaysByStations();
        let returnArr = [];

        const resulte = result.data.map(item => ({
            ...delayStatus.find(({ AdvertisedLocationName }) => item.artefact === AdvertisedLocationName ),
            ...item,
          }));

        resulte.forEach((element) => {
            if (element.AdvertisedTimeAtLocation) {
                returnArr.push(element)
            };
        });
        var clean = returnArr.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.save === arr.save && t.State === arr.State)));

        return clean;
    }


}

export default favorit;
