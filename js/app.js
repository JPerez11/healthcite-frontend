const API_URL = "http://localhost:8090";

async function loadPage() {
    setInterval(validateToken(), 0);
    
    const username_logged = document.getElementById("profile_user");

    username_logged.innerHTML = await getUserById();

}

async function getUserById() {
    const jsonToken = decodeJwt(localStorage.token);
    console.log(jsonToken);
    let settings =  {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const request = await fetch(`${API_URL}/people/${jsonToken.id}`, settings);
    if (request.ok && request.status === 200) {
        const respuesta = await request.json();
        let firstName = respuesta.firstName.charAt(0).toUpperCase() + respuesta.firstName.slice(1);
        let lastName = respuesta.lastName.charAt(0).toUpperCase() + respuesta.lastName.slice(1);
        return `
        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
          <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
          <span class="d-none d-md-block dropdown-toggle ps-2" id="username_logged">${firstName[0]}. ${lastName}</span>
        </a><!-- End Profile Iamge Icon -->

        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li class="dropdown-header">
            <h6>${firstName} ${lastName}</h6>
            <span>${jsonToken.role}</span>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
              <i class="bi bi-person"></i>
              <span>My Profile</span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
              <i class="bi bi-gear"></i>
              <span>Account Settings</span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center" href="pages-callcenter.html">
              <i class="bi bi-question-circle"></i>
              <span>Need Help?</span>
            </a>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center" href="#" role="button" onclick="salir()">
              <i class="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </a>
          </li>

        </ul><!-- End Profile Dropdown Items -->`;
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
        console.log(respuesta.error)
    }
}

function salir() {
    localStorage.clear();
    location.href = "index.html";
}

function validateToken() {
    if (localStorage.token == undefined) {
        salir();
    }
}

function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}