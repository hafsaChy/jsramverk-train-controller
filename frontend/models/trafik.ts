import config from "../config/config.json";


const trafik = {
    getStations: async function getStation(){
        const response = await fetch(`${config.base_url}/stations`);
        const result = await response.json();
        return result.data;
    },
    getDelays: async function getDelay(){
        const response = await fetch(`${config.base_url}/delayed`);
        const result = await response.json();
        return result.data;
    },
    getDelaysByStations: async function getDelaysByStation() {
        let stations = await this.getStations();
        let delays = await this.getDelays();
        let result = [];

        delays.forEach((element) => {
            if (element.FromLocation) {
                result.push(element);
            }
        })
        result = result.map(item => ({
            ...stations.find(({ LocationSignature }) => item.FromLocation[0].LocationName == LocationSignature ),
            ...item,
        }));

     return result
    }
}

export default trafik;
