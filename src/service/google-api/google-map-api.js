import { Base64 } from 'js-base64';
const KEY_GOOGLE_MAP = Base64.decode('QUl6YVN5Q2JzUnh1QTNOR3hwT01lQzBVa21KVGkwVjJidlN5QUpv');
export const getDirection = async (originLocation, destination) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originLocation.latitude},${originLocation.longitude}&destination=${destination.latitude},${destination.longitude}&key=${KEY_GOOGLE_MAP}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    )
    return response.json();
};

export const getDistance = async (originLocation, destination) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originLocation.latitude},${originLocation.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${KEY_GOOGLE_MAP}`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/ plain, */*',
                "Content-Type": "application/json",
            },
        }
    )
    const responseJson = await response.json();
    return responseJson.rows[0].elements[0];
}

