function calculateTime(delay, date) {
    date.setHours(date.getHours() - delay[0]);
    date.setMinutes(date.getMinutes() - delay[1]);
    date.setSeconds(date.getSeconds() - delay[2]);
    return date;
}

function renderTime(date) {
    updateDOM('h', checkTime(date.getHours(), 2));
    updateDOM('m', checkTime(date.getMinutes(), 2));
    updateDOM('s', checkTime(date.getSeconds(), 2));
    updateDOM('ms', checkTime(date.getMilliseconds(), 3));
}

function updateDOM(id, contents) {
    if (document.getElementById(id).innerHTML != contents) {
        document.getElementById(id).innerHTML = contents;
    }
}

function checkTime(time, places) {
    if (time < (10 ** (places-1))) {
        time = "0" + time;
    }
    return time;
}

async function loop() {
    if (motionDecider()) {
        timeout = 50
    } else {
        timeout = 2000
    }
    date = new Date();
    delay = [0, 3, 30]; // delay is an array where [0] = difference in hours, [1] is difference in minutes, [2] is difference in seconds
    renderTime(calculateTime(delay, date));
    setTimeout(loop, timeout);
}

function motionDecider() {
    // Grab the prefers reduced media query.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Check if the media query matches or is not available.
    if (!mediaQuery || mediaQuery.matches) {
        return false;
    } else {
        return true;
    }
}

loop()