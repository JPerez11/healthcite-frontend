const API_URL = "http://localhost:8090";

const formLogin = document.getElementById('formLogin');
  formLogin.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      login();
    }
  });

async function login() {

    var myForm = document.getElementById("formLogin");
    if (myForm.name === "" || myForm.password === "") {
        myForm.classList.add("was-validated");
    }
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
        
        location.href = 'templates/dashboard.html';
    } else if (request.status === 400) {
        const respuesta = await request.json();
        for (response of respuesta) {
            toastr.error(`${response}`);
        }
        
        console.log(respuesta)
    }
    else if (request.status === 401) {
        const respuesta = await request.json();
        toastr.error(`${respuesta.error}`);
        console.log(respuesta.error);
    }
}