const API_URL = "http://localhost:8090";
const jsonToken = decodeJwt(localStorage.token);

async function loadPage() {
    setInterval(validateToken(), 0);
    const title = document.querySelector("title").getInnerHTML();
    loadSidebarPage();
    
    if (jsonToken.role === "PATIENT") {
        return
    }

    loadNavbarPage();
    const username_logged = document.getElementById("profile_user");
    username_logged.innerHTML = await profileUser();

    if (title === "Profile - Healthcite") {
        loadProfilePage();
    } else if (title === "Patient - Healthcite" && jsonToken.role === "DOCTOR") {
        loadPatientPage();
    }

}

// Metodo para cargar los pacientes
async function loadPatientPage() {
    const patient_section = document.getElementById("patient_section");
    patient_section.innerHTML = await patientSection();
}

// Metodo para cargar el perfil del usuario logueado
async function loadProfilePage() {
    const profile_section = document.getElementById("profile_section");
    profile_section.innerHTML = await profileSection();
}

// Metodo para cargar el sidebar
async function loadSidebarPage() {
    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = `
    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <a class="nav-link " href="dashboard.html">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li><!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="tables-data.html">
          <i class="bi bi-people"></i>
          <span>Pacientes</span>
        </a>
      </li><!-- End paciente Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="pages-agenda.html">
          <i class="bi bi-calendar3"></i>
          <span>Agenda</span>
        </a>
      </li><!-- End agenda Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="pages-callcenter.html">
          <i class="bi bi-pc-display-horizontal"></i>
          <span>Call center</span>
        </a>
      </li><!-- End call center Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="pages-reportes.html">
          <i class="bi bi-clipboard-data"></i>
          <span>Reportes</span>
        </a>
      </li><!-- End reportes Page Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed position-absolute bottom-0 start-0" href="users-profile.html">
          <i class="bi bi-gear"></i>
          <span>Configuración</span>
        </a>
      </li><!-- End Configuracion Page Nav -->

    </ul>
    `;
}

// Metodo para cargar el navbar
async function loadNavbarPage() {
    const nav = document.getElementById("navbar");
    nav.innerHTML = `
    <ul class="d-flex align-items-center">

    <li class="nav-item d-block d-lg-none">
      <a class="nav-link nav-icon search-bar-toggle " href="#">
        <i class="bi bi-search"></i>
      </a>
    </li><!-- End Search Icon-->

    <li class="nav-item dropdown">

      <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i class="bi bi-bell"></i>
        <span class="badge bg-primary badge-number">4</span>
      </a><!-- End Notification Icon -->

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li class="dropdown-header">
          You have 4 new notifications
          <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="notification-item">
          <i class="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>30 min. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="notification-item">
          <i class="bi bi-x-circle text-danger"></i>
          <div>
            <h4>Atque rerum nesciunt</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>1 hr. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="notification-item">
          <i class="bi bi-check-circle text-success"></i>
          <div>
            <h4>Sit rerum fuga</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>2 hrs. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="notification-item">
          <i class="bi bi-info-circle text-primary"></i>
          <div>
            <h4>Dicta reprehenderit</h4>
            <p>Quae dolorem earum veritatis oditseno</p>
            <p>4 hrs. ago</p>
          </div>
        </li>

        <li>
          <hr class="dropdown-divider">
        </li>
        <li class="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>

      </ul><!-- End Notification Dropdown Items -->

    </li><!-- End Notification Nav -->

    <li class="nav-item dropdown">

      <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i class="bi bi-chat-left-text"></i>
        <span class="badge bg-success badge-number">3</span>
      </a><!-- End Messages Icon -->

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li class="dropdown-header">
          You have 3 new messages
          <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="../assets/img/messages-1.jpg" alt="" class="rounded-circle">
            <div>
              <h4>Maria Hudson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>4 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="../assets/img/messages-2.jpg" alt="" class="rounded-circle">
            <div>
              <h4>Anna Nelson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>6 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="message-item">
          <a href="#">
            <img src="../assets/img/messages-3.jpg" alt="" class="rounded-circle">
            <div>
              <h4>David Muldon</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>8 hrs. ago</p>
            </div>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>

        <li class="dropdown-footer">
          <a href="#">Show all messages</a>
        </li>

      </ul><!-- End Messages Dropdown Items -->

    </li><!-- End Messages Nav -->

    <li class="nav-item dropdown pe-3" id="profile_user">

    </li><!-- End Profile Nav -->

  </ul>
    `;
}

// Metodo para cargar el perfil del usuario
async function profileUser() {

    const respuesta = await getUserById();

    let firstName = respuesta.firstName.charAt(0).toUpperCase() + respuesta.firstName.slice(1);
    let lastName = respuesta.lastName.charAt(0).toUpperCase() + respuesta.lastName.slice(1);
    let role = jsonToken.role.charAt(0).toUpperCase() + jsonToken.role.slice(1).toLowerCase();
    return `
        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
          <img src="../assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
          <span class="d-none d-md-block dropdown-toggle ps-2" id="username_logged">${firstName[0]}. ${lastName}</span>
        </a><!-- End Profile Iamge Icon -->

        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
          <li class="dropdown-header">
            <h6>${firstName} ${lastName}</h6>
            <span>${role}</span>
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
            <hr class="dropdown-divider">
          </li>

          <li>
            <a class="dropdown-item d-flex align-items-center" href="#" role="button" onclick="salir()">
              <i class="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </a>
          </li>

        </ul><!-- End Profile Dropdown Items -->`;

}

// Metodo para cargar la seccion del perfil
async function profileSection() {

    const respuesta = await getUserById();

    console.log(respuesta)
    let firstName = respuesta.firstName.charAt(0).toUpperCase() + respuesta.firstName.slice(1);
    let lastName = respuesta.lastName.charAt(0).toUpperCase() + respuesta.lastName.slice(1);
    let role = jsonToken.role.charAt(0).toUpperCase() + jsonToken.role.slice(1).toLowerCase();

    return `
    <div class="row">
        <div class="col-xl-4">

          <div class="card">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

              <img src="../assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
              <h2>${firstName} ${lastName}</h2>
              <h3>${role}</h3>
              <div class="social-links mt-2">
                <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

        </div>

        <div class="col-xl-8">

          <div class="card">
            <div class="card-body pt-3">
              <!-- Bordered Tabs -->
              <ul class="nav nav-tabs nav-tabs-bordered">

                <li class="nav-item">
                  <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                </li>

                <li class="nav-item">
                  <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                </li>

              </ul>
              <div class="tab-content pt-2">

                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                  <h5 class="card-title">About</h5>
                  <p class="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p>

                  <h5 class="card-title">Profile Details</h5>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label ">Full Name</div>
                    <div class="col-lg-9 col-md-8">${firstName} ${lastName}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Company</div>
                    <div class="col-lg-9 col-md-8">Hospital Emiro Quintero Cañizares</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Job</div>
                    <div class="col-lg-9 col-md-8">${role}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Country</div>
                    <div class="col-lg-9 col-md-8">Colombia</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Address</div>
                    <div class="col-lg-9 col-md-8">${respuesta.address}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Phone</div>
                    <div class="col-lg-9 col-md-8">${respuesta.phone}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Email</div>
                    <div class="col-lg-9 col-md-8">${respuesta.email}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Birthdate</div>
                    <div class="col-lg-9 col-md-8">${respuesta.birthdate}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Gender</div>
                    <div class="col-lg-9 col-md-8">${respuesta.gender}</div>
                  </div>

                </div>

                <div class="tab-pane fade pt-3" id="profile-settings">

                  <!-- Settings Form -->
                  <form>

                    <div class="row mb-3">
                      <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                      <div class="col-md-8 col-lg-9">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="changesMade" checked>
                          <label class="form-check-label" for="changesMade">
                            Changes made to your account
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="newProducts" checked>
                          <label class="form-check-label" for="newProducts">
                            Information on new products and services
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="proOffers">
                          <label class="form-check-label" for="proOffers">
                            Marketing and promo offers
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" id="securityNotify" checked disabled>
                          <label class="form-check-label" for="securityNotify">
                            Security alerts
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                  </form><!-- End settings Form -->

                </div>

              </div><!-- End Bordered Tabs -->

            </div>
          </div>

        </div>
      </div>
    `;
}

// Metodo para cargar la seccion de los pactientes
async function patientSection() {

    const response = await getAllPeopleByRole();
    console.log(response)
    let count = 0;
    // Formatear las fechas de nacimiento en la zona horaria de Bogotá
    const options = {
        timeZone: 'America/Bogota',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const formatter = new Intl.DateTimeFormat('es-CO', options);
    let patients = `
    
    <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-header">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPatient"><i class="bi bi-person-plus"></i> Crear paciente</button>
                </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">Lista de pacientes</h5>

              <!-- Table with stripped rows -->
              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Reason</th>
                    <th scope="col">EPS</th>
                    <th scope="col">Symptoms</th>
                    <th scope="col">Citation Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>`;

        for (const data of response) {
            let citationDate = new Date(data.citationDate);
            let dateFormat = formatter.format(citationDate);
            count++;
            patients += `
                
                        <tr>
                            <th scope="row">${count}</th>
                            <td>${data.patientName.charAt(0).toUpperCase() + data.patientName.slice(1).toLowerCase()}</td>
                            <td>${data.reason}</td>
                            <td>${data.eps}</td>
                            <td>${data.symptoms}</td>
                            <td>${dateFormat}</td>
                            <td>${data.active}</td>
                        </tr>`;
        }
        patients += `
                </tbody>
            </table>
            <!-- End Table with stripped rows -->

        </div>
        </div>

    </div>
    </div>`;
    
    return patients;
}


// Metodo que hace fetch al endpoint de obtener un usuario por id
async function getUserById() {
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
        return await request.json();

    } else if (request.status === 400) {
        const respuesta = await request.json();
        for (response of respuesta) {
            toastr.error(`${response}`);
        }
        console.log(respuesta)
    }
    else if (request.status === 404) {
        const respuesta = await request.json();
        toastr.error(`${respuesta.error}`);
        console.log(respuesta.error)
        window.location.href = "pages-error-404.html";
    }
}

// Metodo que hace fetch al endpoint de obtener todos los pacientes del doctor
async function getAllPeopleByRole() {
    let settings =  {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const request = await fetch(`${API_URL}/appointment/doctor/${jsonToken.id}`, settings);
    if (request.ok && request.status === 200) {
        return await request.json();

    } else if (request.status === 400) {
        const respuesta = await request.json();
        for (response of respuesta) {
            toastr.error(`${response}`);
        }
        console.log(respuesta)
    }
    else if (request.status === 404) {
        const respuesta = await request.json();
        toastr.error(`${respuesta.error}`);
        console.log(respuesta.error);
        window.location.href = "pages-error-404.html";
    }
}

async function createPerson() {
    var myForm = document.getElementById("createPerson");
    if (myForm.name === "") {
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
            'Authorization': `Bearer ${localStorage.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    };
    const request = await fetch(`${API_URL}/people/`, settings);
    if (request.ok && request.status === 200) {
        return await request.json();

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

function restoreValidate() {
    document.getElementById("createPerson").classList.remove("was-validated");
    
}

function salir() {
    localStorage.clear();
    location.href = "../index.html";
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