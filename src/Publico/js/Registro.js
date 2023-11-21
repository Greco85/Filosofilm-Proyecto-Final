$(document).ready(function() {
    
    $('#FormRegistrarse').submit(function(event) {
        event.preventDefault();
        const Nombre = $('#InputName').val();
        const Apellidos = $('#InputApellidos').val();
        const Nickname = $('#InputNickname').val();
        const Correo = $('#InputEmail').val();
        const Telefono = $('#InputPhone').val();
        const Contraseña = $('#InputPassword').val();
        const ConfirmarContraseña = $('#InputConfirmPassword').val();
        const Fecha_Nacimiento = $('#InputBirthDate').val();
        const Genero = $("input[name='gender']:checked").val();

        $.ajax({ 
            url: "http://localhost:3000/Usuario",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
        data: JSON.stringify(
            {
                "Nickname": Nickname,
                "ID_Rol": "1",
                "Correo_Electronico": Correo,
                "Contraseña": Contraseña,
                "Nombre": Nombre,
                "Apellido": Apellidos,
                "Foto_Perfil": "A",
                "Fecha_Registro": "2005-02-13",
                "Fecha_Nacimiento": Fecha_Nacimiento,
                "Sexo": Genero,
                "Telefono": Telefono,
                "Descripcion": "Soy Diana"
            }
    ),
        crossDomain: true
        }).done(function (result) {
            // Aquí puedes manejar la respuesta exitosa del servidor
            console.log(result);
        }).fail(function (xhr, status, error) {
            // Aquí puedes manejar el error si la solicitud falla
            alert(error);
        });
        
    });
        
    
    

    
    });