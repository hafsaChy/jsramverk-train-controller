export default function getCoordinates(coors: string) {
    let newCoords = coors.split(" ");
    for (let i = 0; i < newCoords.length; i++) {
        newCoords[i] = newCoords[i].replace(/[^\d.-]/g, '');
    };
    return [newCoords[1], newCoords[2]]
};
