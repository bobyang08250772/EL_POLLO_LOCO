/** Get current timestamp in milliseconds */
function getTimestamp() {
    return new Date().getTime();
}

/** Get time elapsed in seconds since last timestamp */
function getTimeElapsedInSecond(lastTime) {
    let timepassed = new Date().getTime() - lastTime;
    timepassed = timepassed / 1000;
    return timepassed;
}

/** Get random integer between min (inclusive) and max (exclusive) */
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/** Get random float between min (inclusive) and max (exclusive) */
function getRandomNumFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/** Get percentage as integer from numerator and denominator */
function getPercentage(numerator, denominator) {
    return Math.floor((numerator / denominator) * 100);
}

/** Call a function after 5000ms (despite name) */
function setTimeout3000(fn) {
    setTimeout(fn, 5000);
}

/** Call a function after 300ms */
function setPushToArrayTimeout300(fn) {
    setTimeout(fn, 300);
}

/** Call a function after 310ms */
function setRemoveFromArraryTimeout310(fn) {
    setTimeout(fn, 310);
}

/** Set an interval and store its ID for later clearing */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
    return id;
}
