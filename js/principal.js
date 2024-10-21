import axios from 'axios';

window.addEventListener('load', function(){

    var btnLogout = this.document.getElementById('btnLogout')
    // referenciar elementos de la pagina
    const msgSuccess = this.document.getElementById('msgSuccess');

    // recuperar nombre del usuario del localStorage
    const result = JSON.parse(this.localStorage.getItem('result'));
    mostrarAlerta(result.nombreUsuario);

    btnLogout.addEventListener('click',function () {
        logout(result)
    })

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

function ocultarAlerta() {
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}

function logout(result) {
    //MEDIANTE WEB CLIENT
    //const url = 'http://localhost:8082/login/logout';
  
    //URL Feign
    const url = "http://localhost:8082/login/log_out_feign";

    axios.post(url, result.usuario)
      .then(async function (response) {
        console.log(response)
        if(!response.status === 200) {
          Swal.fire({
            title: "Ocurrio una excepción",
            text: "No puede cerrar sesion",
            icon: "error"
          });
          throw new Error(`Error: ${response.statusText}`);
        }
        localStorage.removeItem("result")
        window.location.replace('index.html');
      })
      .catch(function (error) {
        console.log(error);
      });
}