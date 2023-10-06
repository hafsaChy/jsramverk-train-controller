export default function getCoordinates(coors) {
    let newCoords = coors.split(" ");
    for (let i = 0; i < newCoords.length; i++) {
        newCoords[i] = newCoords[i].replace(/[^\d.-]/g, '');
    };
    return [newCoords[1], newCoords[2]]
};
