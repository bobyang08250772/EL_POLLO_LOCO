function getTimestamp() {
    return new Date().getTime();
}


function getTimeElapsedInSecond(lastTime) {
    let timepassed = new Date().getTime() - lastTime;
    timepassed = timepassed / 1000;
    return timepassed;
}


function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min))+ min;
}


function getRandomNumFloat(min, max) {
    return Math.random() * (max - min) + min;
}


function getPercentage(numerator, denominator) {
    return Math.floor((numerator / denominator) * 100);
}


function setTimeout3000 (fn) {
    setTimeout(fn, 3000);
}


function setPushToArrayTimeout300 (fn) {
    setTimeout(fn, 300);
}


function setRemoveFromArraryTimeout310 (fn) {
    setTimeout(fn, 310);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
    return id;
}