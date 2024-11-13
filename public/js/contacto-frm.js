(() => {
  if (!localStorage.getItem("userInSession")) {
    return;
  }
  document.querySelector("body").style = "display:block";
  const urlParams = new URLSearchParams(window.location.search);
  const contactoId = urlParams.get("id");

  if (contactoId && !isNaN(contactoId)) {
    document.querySelector("#page-title").innerHTML = "Editar contacto";

    loadContact(contactoId);
  } else {
    document.querySelector("#page-title").innerHTML = "Nuevo contacto";
  }
  document.querySelector("#btn-save").addEventListener("click", saveContact);
  document
    .querySelector("#imageUploader")
    .addEventListener("change", uploadImage);
  document.querySelector("#add-phone").addEventListener("click", addPhone);
  document
    .querySelector("#add-direccion")
    .addEventListener("click", addDireccion);
})();

function loadContact(contactoId) {
  fetch(`api/contacto/${contactoId}`)
    .then((response) => response.json())
    .then((data) => {
      const nombre = document.querySelector("#nombreContacto");
      const email = document.querySelector("#email");
      const telefono = document.querySelector("#telefono");
      const direccion = document.querySelector("#direccion");
      const contactoIdControl = document.querySelector("#contactoId");
      const imageId = document.querySelector("#imageId");

      nombre.value = data.nombreContacto;
      email.value = data.email;
      telefono.value = data.telefono;
      direccion.value = data.direccion;
      contactoIdControl.value = data.contactoId;
      imageId.value = data.imagenId;

      if (data.imagenId > 0) {
        const miniatura = document.getElementById("miniatura");
        miniatura.src = "api/image/" + data.imagenId;
      }

      if (data.telefonos.length > 1) {
        let html = "";
        data.telefonos.slice(1).forEach((telefono, index) => {
          html += createPhoneElement(
            index,
            telefono.nroTelefono,
            telefono.telefonoContactoId
          );
        });
        document.getElementById("phone-list").innerHTML = html;
      }

      if (data.direcciones.length > 0) {
        let html = "";
        data.direcciones.forEach((direccion, index) => {
          html += createDireccionElement(
            index,
            direccion.direccion,
            direccion.direccionescontactosId
          );
        });
        document.getElementById("direccion-list").innerHTML = html;
      }
    });
}

function saveContact() {
  const contactoId = document.querySelector("#contactoId").value;
  const nombre = document.querySelector("#nombreContacto").value.trim();
  const email = document.querySelector("#email").value.trim();
  const imageId = document.querySelector("#imageId").value;

  const validacionNombre = document.querySelector("#validation-name");
  const validacionEmail = document.querySelector("#validation-email");
  const msgError = document.querySelector("#msg-error");

  validacionNombre.style.display = "none";
  validacionEmail.style.display = "none";
  msgError.style.display = "none";

  let hasError = false;
  if (nombre === "") {
    hasError = true;
    validacionNombre.style.display = "block";
  }
  if (email === "") {
    hasError = true;
    validacionEmail.innerHTML = "El correo electrónico es requerido";
    validacionEmail.style.display = "block";
  } else if (!isEmailValid(email)) {
    hasError = true;
    validacionEmail.innerHTML = "El correo electrónico ingresado no es válido";
    validacionEmail.style.display = "block";
  }

  const telefonos = document.querySelectorAll(".telephone");
  const direcciones = document.querySelectorAll(".direccion");

  telefonos.forEach((telefono) => {
    if (telefono.value.trim() === "") {
      hasError = true;
      telefono.parentElement.nextElementSibling.style.display = "block";
    } else {
      telefono.parentElement.nextElementSibling.style.display = "none";
    }
  });

  direcciones.forEach((direccion) => {
    if (direccion.value.trim() === "") {
      hasError = true;
      direccion.parentElement.nextElementSibling.style.display = "block";
    } else {
      direccion.parentElement.nextElementSibling.style.display = "none";
    }
  });

  if (hasError) return;

  const nroTelefonos = [...telefonos].map((telefono) => {
    return {
      nroTelefono: telefono.value.trim(),
      telefonoContactoId: telefono.dataset.id,
      contactoId: contactoId,
    };
  });

  const nroDirecciones = [...direcciones].map((direccion) => {
    return {
      direccion: direccion.value.trim(),
      direccionescontactosId: direccion.dataset.id,
      contactoId: contactoId,
    };
  });

  const usuario = JSON.parse(localStorage.getItem("userInSession"));
  const contacto = {
    usuarioId: usuario.usuarioId,
    nombreContacto: nombre,
    email: email,
    telefonos: nroTelefonos,
    direcciones: nroDirecciones,
    contactoId: contactoId,
    imagenId: imageId,
  };
  const method = contactoId === "0" ? "POST" : "PUT";
  fetch("api/contacto", {
    method: method,
    headers: {
      Accept: "application/json", //MimeType
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contacto),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        msgError.innerHTML = "Error al guardar el contacto";
        msgError.style.display = "block";
        return;
      }
      document.location.href = "index.html?msg=ok_contact_saved";
    })
    .catch((error) => {
      console.error(error);
      msgError.innerHTML = "Error al guardar el contacto";
      msgError.style.display = "block";
    });
}

function addPhone() {
  let phones = [...document.querySelectorAll(".extra-phone")];
  const phoneNumbers = phones.map((e) => e.value);

  const index = phones.length;
  const element = createPhoneElement(index);
  const parent = document.querySelector("#phone-list");
  parent.innerHTML += element;
  phones = document.querySelectorAll(".extra-phone");
  for (var i in phoneNumbers) {
    phones[i].value = phoneNumbers[i];
  }
}

function addDireccion() {
  let direcciones = [...document.querySelectorAll(".extra-direccion")];
  const direccionValues = direcciones.map((e) => e.value);

  const index = direcciones.length;
  const element = createDireccionElement(index);
  const parent = document.querySelector("#direccion-list");
  parent.innerHTML += element;
  direcciones = document.querySelectorAll(".extra-direccion");
  for (var i in direccionValues) {
    direcciones[i].value = direccionValues[i];
  }
}

function removePhone(index) {
  let phones = [...document.querySelectorAll(".extra-phone")];
  const phoneNumbers = phones.map((e) => {
    return { value: e.value, id: e.dataset.id };
  });
  phoneNumbers.splice(index, 1);

  let html = "";
  for (var i in phoneNumbers) {
    html += createPhoneElement(i, phoneNumbers[i].value, phoneNumbers[i].id);
  }

  document.querySelector("#phone-list").innerHTML = html;
}

function removeDireccion(index) {
  let direcciones = [...document.querySelectorAll(".extra-direccion")];
  const direccionValues = direcciones.map((e) => {
    return { value: e.value, id: e.dataset.id };
  });
  direccionValues.splice(index, 1);

  let html = "";
  for (var i in direccionValues) {
    html += createDireccionElement(
      i,
      direccionValues[i].value,
      direccionValues[i].id
    );
  }
  document.querySelector("#direccion-list").innerHTML = html;
}

function createPhoneElement(index, value = "", id = 0) {
  return `<div class="mt-3">
                <div class="input-group">
                    <input type="text" class="form-control telephone extra-phone" value="${value}" data-id="${id}">
                    <div class="input-group-append">
                        <span class="input-group-text pointer" onclick="removePhone(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </div>
                </div>
                <div class="text-danger validation" style="display: none">
                    El número de teléfono es requerido
                </div>
            </div>`;
}

function createDireccionElement(index, value = "", id = 0) {
  return `<div class="mt-3">
              <div class="input-group">
                  <input type="text" class="form-control direccion extra-direccion" value="${value}" data-id="${id}">
                  <div class="input-group-append">
                      <span class="input-group-text pointer" onclick="removeDireccion(${index})">
                          <i class="fa-solid fa-trash"></i>
                      </span>
                  </div>
              </div>
              <div class="text-danger validation" style="display: none">
                  La dirección es requerida
              </div>
          </div>`;
}

function uploadImage() {
  var input = document.querySelector("#imageUploader");

  var data = new FormData();
  data.append("file", input.files[0]);

  fetch("api/image", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((imageId) => {
      document.getElementById("imageId").value = imageId;
      document.getElementById("miniatura").src = "api/image/" + imageId;
    });
}

function isEmailValid(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
