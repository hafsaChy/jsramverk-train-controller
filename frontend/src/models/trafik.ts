// const api_key = process.env.AUTH_API_KEY;
const base_url = "https://auth.emilfolino.se/";

const trafik = {
    getStations: async function getStation(){
        const response = await fetch(`${base_url}/stations`);
        const result = await response.json();
        return result.data;
    },
    getDelays: async function getDelay(){
        const response = await fetch(`${base_url}/delayed`);
        const result = await response.json();
        return result.data;
    },
    getDelaysByStations: async function getDelaysByStation() {
        let stations = await this.getStations();
        let delays = await this.getDelays();
        let result = [];

        delays.forEach((element: { FromLocation: any; }) => {
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
