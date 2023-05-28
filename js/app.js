const API_URL = "http://localhost:8090";
const jsonToken = decodeJwt(localStorage.token);
const ADMIN = {
  doctor: 'Doctores'
}
const DOCTOR = {
  patient: 'Pacientes'
}
const PATIENT = {
  person: 'Persona'
}
const ROLE = {
  ADMIN: 1,
  DOCTOR: 2,
  PATIENT: 3
}
const APPOINTMENT = {
  pending: "PENDING",
  attending: "ATTENDING",
  attended: "ATTENDED"
}

async function loadPage() {
  setInterval(validateToken(), 0);
  loadSidebarPage();
  loadNavbarPage();
  //Constants
  const title = document.querySelector("title");
  const pagetitle = document.querySelector(".pagetitle h1");
  const username_logged = document.getElementById("profile_user");
  const li_sidebar_person = document.getElementById("li_sidebar_person");
  const li_sidebar_agenda = document.getElementById("li_sidebar_agenda");
  const li_sidebar_callcenter = document.getElementById("li_sidebar_callcenter");
  const li_sidebar_eps = document.getElementById("li_sidebar_eps");
  const span_sidebar_person = document.getElementById("span_sidebar_person");
  const modal_title = document.getElementById("modal_title");
  const nav_li_page = document.getElementById("nav_li_page");

  username_logged.innerHTML = await profileUser();
  if (title.innerHTML === "Profile - Healthcite") {
    loadProfilePage();
  }

  if (jsonToken.role === "PATIENT") {
    deleteElement(li_sidebar_person);
    deleteElement(li_sidebar_eps);
    if (title.innerHTML === "Agenda - Healthcite") {
      loadPatientAgendaPage();
    }
    return
  } else if (jsonToken.role === "DOCTOR") {
    deleteElement(li_sidebar_eps);
    span_sidebar_person.textContent = DOCTOR.patient;
    if (title.innerHTML === "Patient - Healthcite") {
      loadPersonPage(2);
    } else if (title.innerHTML === "Agenda - Healthcite") {
      loadAgendaPage();
    }

  } else if (jsonToken.role === "ADMIN") {
    deleteElement(li_sidebar_agenda);
    deleteElement(li_sidebar_callcenter);
    span_sidebar_person.innerHTML = ADMIN.doctor;

    if (title.innerHTML === "Patient - Healthcite") {
      pagetitle.textContent = ADMIN.doctor;
      modal_title.textContent = "Crear doctor";
      nav_li_page.textContent = ADMIN.doctor;
      title.innerHTML = "Doctors - Healthcite";
      loadPersonPage(1);
    } else if (title.innerHTML === "EPS - Healthcite") {
      loadEpsPage();
    }

  }

}

// Metodo para cargar los registros de pacientes o doctores
async function loadPersonPage(id) {
  const person_section = document.getElementById("person_section");
  if (id === 2) {
    person_section.innerHTML = await patientSection();
  } else if (id === 1) {
    person_section.innerHTML = await doctorSection();
  }
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

      <li class="nav-item" id="li_sidebar_person">
        <a class="nav-link collapsed" href="tables-data.html">
          <i class="bi bi-people"></i>
          <span id="span_sidebar_person">Pacientes</span>
        </a>
      </li><!-- End paciente Nav -->

      <li class="nav-item" id="li_sidebar_agenda">
        <a class="nav-link collapsed" href="pages-agenda.html">
          <i class="bi bi-calendar3"></i>
          <span>Citas</span>
        </a>
      </li><!-- End agenda Nav -->

      <li class="nav-item" id="li_sidebar_callcenter">
        <a class="nav-link collapsed" href="pages-callcenter.html">
          <i class="bi bi-pc-display-horizontal"></i>
          <span>Call center</span>
        </a>
      </li><!-- End call center Nav -->

      <li class="nav-item" id="li_sidebar_eps">
        <a class="nav-link collapsed" href="pages-eps.html">
          <i class="bx bx-home-heart"></i>
          <span>EPS</span>
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

  const response = await getUserById();

  let firstName = response.firstName.charAt(0).toUpperCase() + response.firstName.slice(1);
  let lastName = response.lastName.charAt(0).toUpperCase() + response.lastName.slice(1);
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

// Metodo para cargar el perfil del usuario logueado
async function loadAgendaPage() {
  const agenda_section = document.getElementById("agenda_section");
  agenda_section.innerHTML = await appointmentSection();
}

// Metodo para cargar el perfil del usuario logueado
async function loadPatientAgendaPage() {
  const agenda_section = document.getElementById("agenda_section");
  agenda_section.innerHTML = await appointmentPatientSection();
}

async function loadEpsPage() {
  const epsSction = document.getElementById("eps_section");
  epsSction.innerHTML = await epsSection();
}

// Metodo para cargar la seccion del perfil
async function profileSection() {

  const response = await getUserById();
  let firstName = response.firstName.charAt(0).toUpperCase() + response.firstName.slice(1);
  let lastName = response.lastName.charAt(0).toUpperCase() + response.lastName.slice(1);
  let role = jsonToken.role.charAt(0).toUpperCase() + jsonToken.role.slice(1).toLowerCase();
  let gender = response.gender.charAt(0).toUpperCase() + response.gender.slice(1).toLowerCase();

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
                    <div class="col-lg-3 col-md-4 label">Job (ROLE)</div>
                    <div class="col-lg-9 col-md-8">${role}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Country</div>
                    <div class="col-lg-9 col-md-8">Colombia</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Address</div>
                    <div class="col-lg-9 col-md-8">${response.address}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Phone</div>
                    <div class="col-lg-9 col-md-8">${response.phone}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Email</div>
                    <div class="col-lg-9 col-md-8">${response.email}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Birthdate</div>
                    <div class="col-lg-9 col-md-8">${response.birthdate}</div>
                  </div>

                  <div class="row">
                    <div class="col-lg-3 col-md-4 label">Gender</div>
                    <div class="col-lg-9 col-md-8">${gender}</div>
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

// Metodo para cargar la seccion de pacientes
async function appointmentSection() {

  const response = await getAllAppointmentByRole();
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
  let appointments = `
    
    <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-header">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-primary" onclick="showModal()"><i class="bx bxs-calendar-plus"></i> Crear cita</button>
                </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">Lista de citas</h5>

              <!-- Table with stripped rows -->
              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Document</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Reason</th>
                    <th scope="col">EPS</th>
                    <th scope="col">Symptoms</th>
                    <th scope="col">Citation Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>`;

  if (response !== undefined) {

    for (const data of response) {
      let citationDate = new Date(data.citationDate);
      let dateFormat = formatter.format(citationDate);
      count++;
      appointments += `
                          
                                  <tr>
                                      <th scope="row">${count}</th>
                                      <td>${data.patientName.charAt(0).toUpperCase() + data.patientName.slice(1).toLowerCase()}</td>
                                      <td>${data.patientDocument}</td>
                                      <td>${data.patientPhone}</td>
                                      <td>${data.reason}</td>
                                      <td>${data.eps}</td>
                                      <td>${data.symptoms}</td>
                                      <td>${dateFormat}</td>
                                      <td>${data.status}</td>
                                      <td>
                                        <div class="icon text-center">
                                          <i class="bx bxs-calendar-check text-success fs-4" title="Change status" style="cursor: pointer" onclick="updateStatus(${data.id})"></i>
                                        </div>
                                      </td>
                                  </tr>`;
    }
  }
  appointments += `
                </tbody>
            </table>
            <!-- End Table with stripped rows -->

        </div>
        </div>

    </div>
    </div>`;

  return appointments;
}

// Metodo para cargar la seccion de pacientes
async function appointmentPatientSection() {

  const response = await getAllAppointmentByRole();
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
  let appointments = `
    
    <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-header">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-primary" onclick="showModal()"><i class="bx bxs-calendar-plus"></i> Crear cita</button>
                </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">Lista de citas</h5>

              <!-- Table with stripped rows -->
              <table class="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Doctor name</th>
                    <th scope="col">Document</th>
                    <th scope="col">Phone</th>
                    <th scope="col">EPS</th>
                    <th scope="col">Citation Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>`;

  if (response !== undefined) {

    for (const data of response) {
      let citationDate = new Date(data.citationDate);
      let dateFormat = formatter.format(citationDate);
      count++;
      appointments += `
                          
                                  <tr>
                                      <th scope="row">${count}</th>
                                      <td>${data.doctorName.charAt(0).toUpperCase() + data.doctorName.slice(1).toLowerCase()}</td>
                                      <td>${data.doctorDocument}</td>
                                      <td>${data.doctorPhone}</td>
                                      <td>${data.eps}</td>
                                      <td>${dateFormat}</td>
                                      <td>${data.status}</td>
                                  </tr>`;
    }
  }
  appointments += `
                </tbody>
            </table>
            <!-- End Table with stripped rows -->

        </div>
        </div>

    </div>
    </div>`;

  return appointments;
}

// Metodo para cargar la seccion de doctores
async function doctorSection() {

  const response = await getAllDoctorsByRole();
  let count = 0;
  let doctors = `
    
    <div class="row">
      <div class="col-lg-12">

        <div class="card">
          <div class="card-header">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPerson"><i class="bi bi-person-plus"></i> Crear doctor</button>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">Lista de doctores</h5>

            <!-- Table with stripped rows -->
            <table class="table datatable">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Document</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">address</th>
                  <th scope="col">Birthdate</th>
                </tr>
              </thead>
              <tbody>`;

  if (response !== undefined) {
    for (const data of response) {
      count++;
      doctors += `
                        
                  <tr>
                      <th scope="row">${count}</th>
                      <td>${data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase()} ${data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1).toLowerCase()}</td>
                      <td>${data.document}</td>
                      <td>${data.phone}</td>
                      <td>${data.email}</td>
                      <td>${data.address}</td>
                      <td>${data.birthdate}</td>
                  </tr>`;
    }
  }
  doctors += `
              </tbody>
            </table>
            <!-- End Table with stripped rows -->

          </div>
        </div>

      </div>
    </div>`;

  return doctors;
}

// Metodo para cargar la seccion de doctores
async function patientSection() {

  const response = await getAllPatientsByRole();
  let count = 0;
  let patients = `
    
    <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-header">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPerson"><i class="bi bi-person-plus"></i> Crear paciente</button>
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
                    <th scope="col">Document</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">address</th>
                    <th scope="col">Birthdate</th>
                  </tr>
                </thead>
                <tbody>`;

  if (response !== undefined) {
    for (const data of response) {
      count++;
      patients += `
                          
                                  <tr>
                                      <th scope="row">${count}</th>
                                      <td>${data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1).toLowerCase()} ${data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1).toLowerCase()}</td>
                                      <td>${data.document}</td>
                                      <td>${data.phone}</td>
                                      <td>${data.email}</td>
                                      <td>${data.address}</td>
                                      <td>${data.birthdate}</td>
                                  </tr>`;
    }
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

// Metodo para cargar la seccion de eps
async function epsSection() {

  const response = await getAllEps();
  console.log(response)
  let count = 0;
  let eps = `
    
    <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-header">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-primary" onclick="showModalEps()"><i class="bi bi-person-plus"></i> Registrar EPS</button>
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
                    <th scope="col">NIT</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Foundation date</th>
                    <th scope="col">address</th>
                  </tr>
                </thead>
                <tbody>`;

  if (response !== undefined) {
    for (const data of response) {
      count++;
      eps += `
                          
                                  <tr>
                                      <th scope="row">${count}</th>
                                      <td>${data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()}</td>
                                      <td>${data.nit}</td>
                                      <td>${data.phone}</td>
                                      <td>${data.foundationDate}</td>
                                      <td>${data.address}</td>
                                  </tr>`;
    }
  }
  eps += `
                </tbody>
            </table>
            <!-- End Table with stripped rows -->

        </div>
        </div>

    </div>
    </div>`;

  return eps;
}

// Metodo para cargar el formulario de eps en la modal
async function formModalEps() {

  return form = `
      <form class="needs-validation" id="formCreateEps" novalidate>
        
        <div class="row mb-3">
          <label for="name" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="name" id="name" required>
          </div>
        </div>
        <div class="row mb-3">
          <label for="nit" class="col-sm-2 col-form-label">Nit</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="nit" id="nit" required>
          </div>
        </div>
        <div class="row mb-3">
          <label for="phone" class="col-sm-2 col-form-label">Phone</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="phone" id="phone" required>
          </div>
        </div>
        <div class="row mb-3">
          <label for="address" class="col-sm-2 col-form-label">Address</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="address" id="address" required>
          </div>
        </div>
        <div class="row mb-3">
          <label for="foundationDate" class="col-sm-2 col-form-label">Foundation date</label>
          <div class="col-sm-10">
            <input type="date" class="form-control" name="foundationDate" id="foundationDate" required>
          </div>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="reset" class="btn btn-outline-secondary">Reset</button>
          <button type="button" class="btn btn-success" onclick="createEps()">Save</button>
        </div>
      </form>
  `;
}

// Metodo para cargar el formulario en la modal
async function formModalAppointment() {

  const epsResponse = await getAllEps();

  if (epsResponse === undefined || epsResponse === null) {
    $('#my_modal').modal('hide');
  }
  let form = `
      <form class="needs-validation" id="formCreateAppointment" novalidate>
        
      <div class="row mb-3">
        <label for="citationDate" class="col-sm-2 col-form-label">Citation date</label>
        <div class="col-sm-10">
          <input type="datetime-local" class="form-control" name="citationDate" id="citationDate" required>
        </div>
      </div>
        <div class="row mb-3">
          <label for="description" class="col-sm-2 col-form-label">Description</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="description" id="description" required>
          </div>
        </div>
        `;
  let response;
  if (jsonToken.role === "PATIENT") {
    response = await getAllDoctorsByRole();
    form += `
        <div class="row mb-3">
          <label for="doctorDocument" class="col-sm-2 col-form-label">Doctor</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="doctorDocument" list="doctorList" id="doctorDocument" required>
          </div>
        </div>
        <datalist id="doctorList">
        `;
  if (response !== undefined) {
    for (const doctor of response) {
      form += `
            <option value="${doctor.document}">${doctor.firstName.charAt(0).toUpperCase() + doctor.firstName.slice(1).toLowerCase()} ${doctor.lastName.charAt(0).toUpperCase() + doctor.lastName.slice(1).toLowerCase()}</option>
            `;
    }
  }
  form += `
      </datalist>
      <div class="row mb-3">
          <label for="epsName" class="col-sm-2 col-form-label">EPS</label>
          <div class="col-sm-10">
            <input type="epsName" class="form-control" name="epsName" list="epsList" id="epsName" required>
          </div>
        </div>
        <datalist id="epsList">
        `;
  } else if (jsonToken.role === "DOCTOR") {
    response = await getAllPatientsByRole();
    form += `
        <div class="row mb-3">
          <label for="patientDocument" class="col-sm-2 col-form-label">Patient</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name="patientDocument" list="patientList" id="patientDocument" required>
          </div>
        </div>
        <datalist id="patientList">
        `;
  if (response !== undefined) {
    for (const patient of response) {
      form += `
            <option value="${patient.document}">${patient.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1).toLowerCase()} ${patient.lastName.charAt(0).toUpperCase() + patient.lastName.slice(1).toLowerCase()}</option>
            `;
    }
  }
  form += `
      </datalist>
      <div class="row mb-3">
          <label for="epsName" class="col-sm-2 col-form-label">EPS</label>
          <div class="col-sm-10">
            <input type="epsName" class="form-control" name="epsName" list="epsList" id="epsName" required>
          </div>
        </div>
        <datalist id="epsList">
        `;
  }

    
  if (epsResponse !== undefined) {
    for (const eps of epsResponse) {
      form += `
            <option value="${eps.name}"></option>
            `;
    }
  }
  form += `
      </datalist>
      <div class="row mb-3">
        <label for="symptoms" class="col-sm-2 col-form-label">Symptoms</label>
        <div class="col-sm-10">
          <textarea class="form-control" name="symptoms" id="symptoms" style="height: 92px; resize: none;" required></textarea>
        </div>
      </div>
      <div class="row mb-3">
        <label for="reason" class="col-sm-2 col-form-label">Reason</label>
        <div class="col-sm-10">
          <textarea class="form-control" name="reason" id="reason" style="height: 92px; resize: none;" required></textarea>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="reset" class="btn btn-outline-secondary">Reset</button>
        <button type="button" class="btn btn-success" onclick="createAppointment()">Save</button>
      </div>
      </form>
  `;
  return form;
}

// Metodo que hace fetch al endpoint de obtener un usuario por id
async function getUserById() {
  let settings = {
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

// Metodo que hace fetch al endpoint de obtener todos los pacientes que tienen cita con el doctor
async function getAllAppointmentByRole() {
  let route = "";
  if (jsonToken.role === "PATIENT") {
    route = `patient/${jsonToken.id}`;
  } else if (jsonToken.role === "DOCTOR") {
    route = `doctor/${jsonToken.id}`;
  }
  let settings = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const request = await fetch(`${API_URL}/appointment/${route}`, settings);
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
  }
}

// Metodo que hace fetch al endpoint de obtener todos los pacientes que tienen cita con el doctor
async function getAllAppointmentByRoleAndStatus() {
  let settings = {
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
  }
}

// Metodo para obtener todos los doctores
async function getAllDoctorsByRole() {
  let settings = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const request = await fetch(`${API_URL}/people/type/DOCTOR`, settings);
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
  }
}

// Metodo para obtener todos los pacientes
async function getAllPatientsByRole() {
  let settings = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const request = await fetch(`${API_URL}/people/type/PATIENT`, settings);
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
  }
}

// Metodo para obtener todas las EPS
async function getAllEps() {
  let settings = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const request = await fetch(`${API_URL}/eps/`, settings);
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
  }
}

// Metodo para obtener una cita por ID
async function getAppointmentById(id) {

  let settings = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const request = await fetch(`${API_URL}/appointment/${id}`, settings);
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
  }

}

// Metodo para crear una persona
async function createPerson() {
  let idRole;
  let idUser;
  if (jsonToken.role === "ADMIN") {
    idUser = ROLE.ADMIN;
    idRole = 2;
  } else if (jsonToken.role === "DOCTOR") {
    idUser = ROLE.DOCTOR;
    idRole = 3;
  }

  var myForm = document.getElementById("formCreatePerson");
  var formData = new FormData(myForm);
  formData.forEach(data => {
    if (data === "") {
      myForm.classList.add("was-validated");
    }
  });
  var jsonData = {};
  for (var [k, v] of formData) {//convertimos los datos a json
    jsonData[k] = v;
  }
  jsonData.idRole = idRole;
  let settings = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  };
  const request = await fetch(`${API_URL}/people/`, settings);
  if (request.ok && request.status === 201) {
    toastr.success('Registro Guardado');
    loadPersonPage(idUser);
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

// Metodo para crear una una cita
async function createAppointment() {

  var myForm = document.getElementById("formCreateAppointment");
  var formData = new FormData(myForm);
  formData.forEach(data => {
    if (data === "") {
      myForm.classList.add("was-validated");
    }
  });
  var jsonData = {};
  for (var [k, v] of formData) {//convertimos los datos a json
    jsonData[k] = v;
  }
  const user = await getUserById(jsonToken.id);
  if (jsonToken.role === "PATIENT") {
    jsonData.patientDocument = user.document;
  } else if (jsonToken.role === "DOCTOR") {
    jsonData.doctorDocument = user.document;
  }
  jsonData.attentionDate = currentDate();
  
  jsonData.status = APPOINTMENT.pending;
  let settings = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  };
  const request = await fetch(`${API_URL}/appointment/`, settings);
  if (request.ok && request.status === 201) {
    toastr.success('Registro Guardado');
    if (jsonToken.role === "PATIENT") {
      loadPatientAgendaPage();
    } else if (jsonToken.role === "DOCTOR") {
      loadAgendaPage();
    }
    
    return await request.json();

  } else if (request.status === 409) {
    const respuesta = await request.json();
    toastr.error(`${respuesta.error}`);
    console.log(respuesta.error);
  } else if (request.status === 400) {
    const respuesta = await request.json();
    for (response of respuesta) {
      toastr.error(`${response}`);
    }
    console.log(respuesta)
  } else if (request.status === 401) {
    const respuesta = await request.json();
    toastr.error(`${respuesta.error}`);
    console.log(respuesta.error);
  }
}

// Metodo para actualizar el estado de la cita
async function updateStatus(id) {

  const appointment = await getAppointmentById(id);
  let jsonBody = {}

  if (appointment.status === APPOINTMENT.pending) {
    jsonBody.status = APPOINTMENT.attending;
  } else if (appointment.status === APPOINTMENT.attending) {
    jsonBody.status = APPOINTMENT.attended;
  } else if (appointment.status === APPOINTMENT.attended) {
    return toastr.warning("No puede cambiar este estado")
  }

  let settings = {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonBody)
  };
  const request = await fetch(`${API_URL}/appointment/update/status/${id}`, settings);
  if (request.ok && request.status === 201) {
    toastr.success('Registro Guardado');
    loadAgendaPage();
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
    return toastr.error(`${respuesta.error}`);
  }
}

//Metodo para crear una EPS
async function createEps() {
  var myForm = document.getElementById("formCreateEps");
  var formData = new FormData(myForm);
  formData.forEach(data => {
    if (data.innerHTML === "") {
      myForm.classList.add("was-validated");
    }
  });
  var jsonData = {};
  for (var [k, v] of formData) {//convertimos los datos a json
    jsonData[k] = v;
  }
  let settings = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  };
  const request = await fetch(`${API_URL}/eps/`, settings);
  if (request.ok && request.status === 201) {
    toastr.success('Registro Guardado');
    loadEpsPage();
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

// Metodo para mostrar la modal de citas
async function showModal() {
  $('#my_modal').modal('show');
  document.querySelector('#modal_content').innerHTML = await formModalAppointment();
}

// Metodo para mostrar la modal de eps
async function showModalEps() {
  $('#my_modal_eps').modal('show');
  document.querySelector('#modal_content_eps').innerHTML = await formModalEps();
}

function restoreValidate() {
  document.getElementById("formCreatePerson").classList.remove("was-validated");

}

function salir() {
  localStorage.clear();
  location.href = "../index.html";
}

function validateToken() {
  if (localStorage.token == undefined) {
    salir();
  }
  if (jsonToken.exp <= Math.floor(Date.now() / 1000)) {
    toastr.warning("Sesión expirada");
    setTimeout(salir(), 1000);
  }
}

function deleteElement(element) {

  if (element) {
    element.remove();
  }

}

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function currentDate() {
  // Obtener la fecha y hora actual
  const currentDate = new Date();
  // Obtener los componentes de la fecha y hora actual
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // El mes es base 0, por lo que se suma 1
  const day = currentDate.getDate().toString().padStart(2, '0');
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  // Crear una cadena de fecha y hora en el formato adecuado (YYYY-MM-DDTHH:MM)
  return formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
}