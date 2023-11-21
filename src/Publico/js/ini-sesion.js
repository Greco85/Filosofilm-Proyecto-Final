$(document).ready(function() {
    
    $("#UsuarioForm").submit(function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        
        const correo = $("#email").val(); // Obtiene el correo electrónico del campo de entrada
        const contraseña = $("#password").val(); // Obtiene la contraseña del campo de entrada

        // Realiza una solicitud AJAX al servidor para iniciar sesión
        $.ajax({
            url: `/Usuario/Verificacion/Correo/${correo}`, // URL a la que enviar la solicitud
            method: 'POST', // Método de la solicitud (en este caso, POST)
            data: {
                Contraseña: contraseña // Envía la contraseña como parte de los datos de la solicitud
            },
            success: function(response) { 
                window.location.href = "/Inicio";
            },
            error: function(xhr, status, error) {
                // Si hay un error en la solicitud, se maneja aquí
                console.error(error);
                alert("Correo o Contraseña Invalida"); // Muestra un mensaje de error
            }
        });
    });
});

