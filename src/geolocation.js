const showPosition = (resolve, pos) => {
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;

    resolve({ lat, lng });
};

const showError = (reject, err) => {
    switch (err.code) {
        case err.PERMISSION_DENIED:
            reject('Please allow GPS access for this site and try again.');
            break;
        case err.POSITION_UNAVAILABLE:
            reject('Your location is unavailable. Check your internet and try again');
            break;
        case err.TIMEOUT:
            reject('Timed out. Process took too long.');
            break;
        case err.UNKNOWN_ERROR:
            reject('An unknown error occurred.');
            break;
    };
};

const useGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => showPosition(resolve, pos),
                err => showError(reject, err)
            );
        } else {
            reject("Can't find your location, browser not supported.");
        }
    });
};

export { useGeolocation };