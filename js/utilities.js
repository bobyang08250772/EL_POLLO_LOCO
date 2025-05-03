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