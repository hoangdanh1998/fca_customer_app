import {
    KEY_GOOGLE_MAP,
} from "../../constants/index";
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

