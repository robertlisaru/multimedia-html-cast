function secondsToHHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

const Utils = { secondsToHHMMSS: secondsToHHMMSS }

export default Utils