
function validarInicioSesion() {

    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="password"]').value;

    if (cuentaValida(email, password)) {
        window.location.href = 'pagina_principal.html'; 
    } else {
        alert('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
    }
}

function redirigirRegistro() {
    window.location.href = 'registro.html'; 
}

document.querySelector('button[type="submit"]').addEventListener('click', validarInicioSesion);
document.querySelector('a[href="#"]').addEventListener('click', redirigirRegistro);

function cuentaValida(email, password) {

    return true;
}
