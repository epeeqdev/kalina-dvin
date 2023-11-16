export const generateGoogleMapsLink = (address:string) => {
    const formattedAddress =  encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
};