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

// function checkKill() {
//     var url = "/checkkill/kill";
//     return new Promise(function (resolve, reject) {
//         let xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function () {
//             if (xmlhttp.readyState == XMLHttpRequest.DONE) {
//                 if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                     myObj = this.responseText;
//                     console.log(this.response);
//                 }
//                 else if (xmlhttp.status == 400) {
//                     reject('Status code: ' + this.status + "  ERROR");
//                 }

//                 else {
//                     reject('Status code: ' + this.status);
//                 }
//             }
//         };
//         xmlhttp.open("GET", url, true);
//         xmlhttp.send();
//     });
// }

function checkInterface() {
    fetch('/checkinterface/check', {
        method: 'get'
    }) .then(response => response.json())
    .then(data => console.log(data))
    .catch(function (err) {
        console.log(err);
    });
}

function startWlan() {
    fetch('/startwlan/start', {
        method: 'get'
    }) .then(response => response.json())
    .then(data => console.log(data))
    .catch(function (err) {
        console.log(err);
    });
}

function airodWlan1() {
    fetch('/airodwlan1/airodumpStart', {
        method: 'get'
    }) .then(response => response.json())
    .then(data => console.log(data))
    .catch(function (err) {
        console.log(err);
    });
}

function showError(error) {
    console.log(error + this.status);
}
