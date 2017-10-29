document.getElementById("checkKill").addEventListener('click', checkKill)
document.getElementById("startWlan").addEventListener('click', startWlan)
document.getElementById("airodWlan1").addEventListener('click', airodWlan1)

function checkKill() {
    fetch('/checkkill/kill', {
        method: 'get'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(function (err) {
            console.log(err);
        });
}

function checkInterface() {
    fetch('/checkinterface/check', {
        method: 'get'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(function (err) {
            console.log(err);
        });
}

function startWlan() {
    fetch('/startwlan/start', {
        method: 'get'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(function (err) {
            console.log(err);
        });
}

function airodWlan1() {
    fetch('/airodwlan1/airodumpStart', {
        method: 'get'
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(function (err) {
            console.log(err);
        });
}

