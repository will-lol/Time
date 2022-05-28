async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

async function getTime() {
    try {
        const data = await getData('https://worldtimeapi.org/api/timezone/Australia/Melbourne');
        let timeDate = new Date(data.datetime);
        return timeDate;
    }
    catch {
        console.log("Unsuccesful connection to server. Using system time.")
        let timeDate = new Date();
        return timeDate;
    }
}

function checkTime(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

async function init() {
    time = await getTime();
    let h = time.getHours();
    let m = checkTime(time.getMinutes());
    let s = checkTime(time.getSeconds());
    document.getElementById('h').innerHTML = h;
    document.getElementById('m').innerHTML = m;
    document.getElementById('s').innerHTML = s;
    setTimeout(init, 100);
}

init()