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

        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1;
        const dia = fechaActual.getDate();
        const Fecha_Registro = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;

        if (Contraseña === ConfirmarContraseña) {
            if (Contraseña.length < 5) {
                console.log("La contraseña debe tener al menos 5 caracteres.");
                return;
            } else {
                verificarDisponibilidad(Correo, Telefono, Nickname)
                    .then((disponibilidad) => {
                        if (disponibilidad) {
                            registrarUsuario({
                                Nickname,
                                ID_Rol: "1",
                                Correo_Electronico: Correo,
                                Contraseña,
                                Nombre,
                                Apellido: Apellidos,
                                Foto_Perfil: "",
                                Fecha_Registro,
                                Fecha_Nacimiento,
                                Sexo: Genero,
                                Telefono,
                                Descripcion: ""
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            console.log("La contraseña no coincide.");
        }
    });
});

function verificarDisponibilidad(correo, telefono, nickname) {
    return new Promise((resolve, reject) => {
        verificarCorreo(correo)
            .then((correoDisponible) => {
                if (!correoDisponible) {
                    console.log("Ya hay un correo asociado, por favor elija otro.");
                    resolve(false);
                } else {
                    return verificarTelefono(telefono);
                }
            })
            .then((telefonoDisponible) => {
                if (!telefonoDisponible) {
                    console.log("Ya hay un Teléfono asociado, por favor elija otro.");
                    resolve(false);
                } else {
                    return verificarNickname(nickname);
                }
            })
            .then((nicknameDisponible) => {
                if (!nicknameDisponible) {
                    console.log("Ya hay un Nickname asociado, por favor elija otro.");
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function verificarCorreo(correo) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3000/Usuario/Verificacion/Correo/${correo}`,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function(result) {
                let usuarios = result || [];
                let numeroUsuarios = usuarios.length;
                resolve(numeroUsuarios === 0);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

function verificarTelefono(telefono) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3000/Usuario/Verificacion/Telefono/${telefono}`,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function(result) {
                let usuarios = result || [];
                let numeroUsuarios = usuarios.length;
                resolve(numeroUsuarios === 0);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

function verificarNickname(nickname) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `http://localhost:3000/Usuario/Verificacion/Nickname/${nickname}`,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function(result) {
                let usuarios = result || [];
                let numeroUsuarios = usuarios.length;
                resolve(numeroUsuarios === 0);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

function registrarUsuario(data) {
    $.ajax({
        url: "http://localhost:3000/Usuario",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(data),
        crossDomain: true
    }).done(function (result) {
        console.log(result + " Enviado a la Base de datos Correctamente");
        window.location.href = "/"; // Redirecciona a la página de inicio de sesión
    }).fail(function (xhr, status, error) {
        alert(error);
    });
}
