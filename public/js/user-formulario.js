document.querySelector('#registroForm').addEventListener('submit', async function (e) {
    e.preventDefault(); 
    
    const nombreUsuario = document.querySelector('#nombre_usuario').value.trim();
    const password = document.querySelector('#contrasena').value.trim();
    const imageId = document.querySelector("#imageId").value;

    if (nombreUsuario === '' || password === '') {
        alert('Por favor, complete todos los campos');
        return;
    }

    const usuario =  {
        userName: nombreUsuario,
        password: password,
        imagenId: imageId
    };

    try {
        const response = await fetch('/api/usuario', {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const data = await response.json();
        if (!data) {
            alert('Error al guardar el usuario');
            return;
        }
        alert('Usuario guardado correctamente');
    } catch (error) {
        console.error(error);
        alert('Error al guardar el usuario');
    }
});

document.querySelector("#imageUploader").addEventListener('change', uploadImage);

function uploadImage() {
    var input = document.querySelector("#imageUploader");

    var data = new FormData();
    data.append('file', input.files[0]);

    fetch('api/image', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then((imageId) => {
        document.getElementById("imageId").value = imageId;
        document.getElementById("miniatura").src = "api/image/" + imageId;
    })
    .catch(error => {
        console.error('Error al subir la imagen:', error);
    });
}