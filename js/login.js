const API_URL = "http://localhost:8090";


async function login() {

    var myForm = document.getElementById("formLogin");
    var formData = new FormData(myForm);
    var jsonData = {};
    for (var [k, v] of formData) {//convertimos los datos a json
        jsonData[k] = v;
    }
    let settings =  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    };
    const request = await fetch(`${API_URL}/auth/login`, settings);
    if (request.ok && request.status === 200) {
        const respuesta = await request.json();
        console.log(respuesta.token)
        localStorage.token = respuesta.token;
        
        location.href = 'index.html';
    } else if (request.status === 400) {
        const respuesta = await request.json();
        console.log(respuesta)
    }
    else if (request.status === 401) {
        const respuesta = await request.json();
        console.log(respuesta)
    }
}

function getToken() {
    console.log(localStorage.token);
}