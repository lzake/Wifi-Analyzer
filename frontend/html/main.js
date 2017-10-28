document.getElementById("checkKill").addEventListener('click', checkProcess)
document.getElementById("startWlan").addEventListener('click', startWlan)
document.getElementById("airodWlan1").addEventListener('click', airodWlan1)


function checkProcess() {
    checkKill()
        .catch(showError)
}

function checkKill() {
    fetch('/checkkill/kill', {
        method: 'get'
    }).then(function (response) {
        document.getElementById('info').innerHTML = response;
        console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}

function checkInterface() {
    fetch('/checkinterface/check', {
        method: 'get'
    }).then(function (response) {
        console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}

function startWlan() {
    fetch('/startwlan/start', {
        method: 'get'
    }).then(function (response) {
        console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}

function airodWlan1() {
    fetch('/airodwlan1/airodumpStart', {
        method: 'get'
    }).then(function (response) {
        console.log(response);
    }).catch(function (err) {
        console.log(err);
    });
}

function showError(error) {
    console.log(error + this.status);
}
