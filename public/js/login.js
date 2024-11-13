(function(){
    
    if (localStorage.getItem("userInSession")){
        document.location.href = "index.html";
        return;
    }
    
    document.body.style.display = "block"

    document.querySelector("#btn-login").addEventListener('click',(e) =>{
        e.preventDefault();//Cancela el evento de Click
        
        
        
        const [ validationUsername, validationPassword, msgError ] =
                    document.querySelectorAll("#validation-username, #validation-password, #msg-error-login");
        /*
        const elementos = document.querySelectorAll("#validation-username, #validation-password,, #msg-error-login");
        const validationUsername = elementos[0];
        const validationPassword = elementos[1];
        const msgError = elementos[2];
        */
       
       /*
        const validationUsername = document.getElementById("validation-username");
        const validationPassword = document.querySelector("#validation-password");
        const msgError = document.querySelector("#msg-error-login");
        */

        validationUsername.style.display = "none";
        validationPassword.style.display = "none";
        msgError.style.display = "none";

        const inputUsername = document.querySelector("#inputUsername");
        const inputPassword = document.querySelector("#inputPassword");
        let hasError = false;
        if(inputUsername.value.trim() === ""){
            hasError = true;
            validationUsername.style.display = "block";
        }
        if (inputPassword.value.trim() === ""){
            hasError = true;
            validationPassword.style.display = "block";
        }

        if(hasError){
            return;
        }

        const usuario = {
            "username" : inputUsername.value,
            "password" : inputPassword.value
        }
        fetch('api/usuario/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', //MimeType
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status)
            }           

            return response.json();
        }).then((data) => {
            
            if(!data){
                msgError.innerHTML = "Usuario y/o Contraseña son invalidos";
                msgError.style.display = "block"
                return;
            }
            localStorage.setItem("userInSession", JSON.stringify(data));

            document.location.href = "index.html";

        }).catch(function (error) {
            msgError.innerHTML = "Usuario y/o Contraseña son invalidos";
            msgError.style.display = "block"
            return;
        });

        /*
        var elementos = document.querySelectorAll("#validation-username, #validation-password");
        for(let i =0 ; i < elementos.length; i++){
            elementos[i].style.display = "none";
        }

        var elementos = document.querySelectorAll("#validation-username, #validation-password");
        for(let i in elementos){
            elementos[i].style.display = "none";
        }
        */

    })



})();