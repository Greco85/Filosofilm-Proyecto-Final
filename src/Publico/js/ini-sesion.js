$(document).ready(function() {
    $("#UsuarioForm").submit(function(event) {
        event.preventDefault();

        const correo = $("#email").val();
        const contraseña = $("#password").val();

        $.ajax({
            url: `/Usuario/Verificacion/Correo/${correo}`, 
            method: 'POST', //
            data: {
                Contraseña: contraseña // Enviar la contraseña como parte de los datos
            },
            success: function(response) {
                if (response.length > 0) {
                    const JSONContraseña = response[0].Contraseña;
                    const JSONCorreo = response[0].Correo_Electronico;

                    if(JSONContraseña == contraseña && JSONCorreo == correo) { 
                        alert("Inicio de sesión exitoso");
                        window.location.href = "/Inicio"; 
                    } else {
                        alert("El Correo o la Contraseña son incorrectos");
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert("El Correo o la Contraseña son incorrectos");
            }
        });
    });
});






/*
function validarInicioSesion() {

    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="password"]').value;

    if (cuentaValida(email, password)) {
        window.location.href = 'pagina_principal.html'; 
    } else {
        alert('Credenciales incorrectas. Por favor, verifica tu correo y contraseña.');
    }
}
*/
/*

function redirigirRegistro() {
    window.location.href = 'registro.html'; 
}

*/

/*
document.querySelector('button[type="submit"]').addEventListener('click', validarInicioSesion);
document.querySelector('a[href="#"]').addEventListener('click', redirigirRegistro);

function cuentaValida(email, password) {
    return true;
}

*/

