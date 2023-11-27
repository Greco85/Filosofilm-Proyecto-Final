$(document).ready(function() {

    const cerrarSesionLink = document.getElementById('cerrarSesionLink');
  
    cerrarSesionLink.addEventListener('click', function(e) {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    });
  
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/IDusuarioLog',
        success: function(data) {
            const ID_Usuario = data.ID_Usuario
            if (data.Nickname) {
                
                $('#nombreUsuario').html(`<strong>@ ${data.Nickname} </strong>`);
                $('h2.text-center').text(`Informacion del Usuario`);  
            } else {
                console.log('No se recibió un Nickname válido');
            }

            $.ajax({
                type: 'GET',
                url: `http://localhost:3000/Usuario/${ID_Usuario}`,
                success: function(usuario) {
                    $('#nombreVisualizacionSpan').text(usuario.Nickname);
                    $('#RolSpan').text(usuario.ID_Rol);
                    $('#nombreSpan').text(usuario.Nombre);
                    $('#Apellidos').text(usuario.Apellido);
                    $('#correoElectronicoSpan').text(usuario.Correo_Electronico);
                    $('#fechacreacionSpan').text(formatearFecha(usuario.Fecha_Registro));
                    $('#DescripcionCampo').text(usuario.Descripcion);
                    $('#fechaNacimientoSpan').text(formatearFecha(usuario.Fecha_Nacimiento));
                    $('#generoSpan').text(usuario.Sexo);
                    $('#fechaRegistroSpan').text(formatearFecha(usuario.Fecha_Registro));
                },
                error: function(xhr, status, error) {
                    console.error('Error al obtener la información del usuario:', status, error);
                }
            });
            
            // Función para formatear la fecha
            function formatearFecha(fecha) {
                const fechaActual = new Date(fecha);
                fechaActual.setDate(fechaActual.getDate() + 1);
                return fechaActual.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            }



        },
        error: function(xhr, status, error) {
            console.error('Error al obtener el nombre del usuario:', status, error);
        }
    });

    
  });
  