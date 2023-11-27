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
          
        $.ajax({
          type: 'GET',
          url: `http://localhost:3000/Usuario/${data.ID_Usuario}`,
          success: function(usuario) {
            $('#nombreUsuario').html(`<strong>@${data.Nickname} </strong>`);
              // Llenar los campos con los datos del usuario obtenidos
              $('#nombreVisualizacion').val(usuario.Nombre);
              $('#ApellidosVisualizacion').val(usuario.Apellido);
              $('#nuevaContrasena').val(usuario.Contraseña); 
              $('#Contraseña').val(usuario.Contraseña); 
              $('#telefono').val(usuario.Telefono); 
              $('#campoTexto').val(usuario.Descripcion);
              console.log(usuario.Sexo)
              if (usuario.Sexo == 'female') {
                $('#female').prop('checked', true);
            } else if (usuario.Sexo === 'male') {
                $('#male').prop('checked', true);
            } else if (usuario.Sexo === 'other') {
              $('#Otro').prop('checked', true);
          }
  

          $('form').submit(function(e) {
            e.preventDefault(); 

            const nombre = $('#nombreVisualizacion').val();
            const apellidos = $('#ApellidosVisualizacion').val();
            const nuevaContrasena = $('#nuevaContrasena').val();
            const confirmarContrasena = $('#Contraseña').val();
            const telefono = $('#telefono').val();
            const descripcion = $('#campoTexto').val();
            const sexo = $("input[name='gender']:checked").val();
        
            if (nuevaContrasena !== confirmarContrasena) {
              
              alert('Las contraseñas no coinciden');
              return; 
            }
            const datosUsuario = {
              Nickname: data.Nickname,
              ID_Rol: data.ID_Rol,
              Correo_Electronico: usuario.Correo_Electronico,
              Contraseña: nuevaContrasena,
              Nombre: nombre,
              Apellido: apellidos,
              Foto_Perfil: usuario.Foto_Perfil,
              Fecha_Registro: usuario.Fecha_Registro,
              Fecha_Nacimiento: usuario.Fecha_Nacimiento,
              Sexo: sexo,
              Telefono: telefono,
              Descripcion: descripcion
              
            };

            console.log(datosUsuario)

            $.ajax({
              type: 'PUT',
              url: `http://localhost:3000/Usuario/${usuario.ID_Usuario}`,
              contentType: 'application/json',
              data: JSON.stringify(datosUsuario),
              success: function(response) {
            
                console.log('Datos actualizados con exito:', response);
                window.location.href = '/MiInformacion';

              },
              error: function(xhr, status, error) {
                
                console.error('Error al actualizar los datos:', status, error);
              }
            });
        
    
    
          });
          },
          error: function(xhr, status, error) {
              console.error('Error al obtener la información del usuario:', status, error);
          }
      });

      },
      error: function(xhr, status, error) {
          console.error('Error al obtener el nombre del usuario:', status, error);
      }
  });


  













});
