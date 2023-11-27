import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const redireccionInicio = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (!err) {
                // Si el token es válido, redirige al usuario a la página de inicio
                return res.redirect('/Inicio');
            }
        });
    }
    // Si no hay token o el token es inválido, llama a next() para continuar con la ruta original
    next();
};

export const SoloLoggeado = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ message: 'Acceso prohibido, token inválido' });
            }
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al validar el token' });
    }
};

//CODIGO SI SESION LO MANDA A DONDE TIENE QUE ESTAR

export const InicioSesion = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ message: 'Acceso prohibido, token inválido' });
            }

            const Rol = decodedToken.ID_Rol; // Obtener el rol del token decodificado

            // Lógica para redirección según el rol
            switch (Rol) {
                case 1:
                case 2:
                    next();
                    break;
                case 3:
                    res.redirect('/Moderador');
                    return;
                case 4:
                    res.redirect('/Admin');
                    return;
                default:
                    res.json({ message: 'Rol no reconocido' });
                    break;
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al validar el token' });
    }
};

export const SoloAdmin = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const Rol = decodedToken.ID_Rol; 

        if (Rol == 4) {
            next(); 
        } else {
            res.redirect('/Inicio'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al validar el token' });
    }
};

export const SoloModerador = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const Rol = decodedToken.ID_Rol; 

        if (Rol == 3) {
            next(); 
        } else {
            res.redirect('/Inicio'); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al validar el token' });
    }
};



export const ExtraerID = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
  
      if (!token) {
        throw new Error('Inicia Sesion para continuar');
      }
  
      const Decodificado = jwt.verify(token, process.env.JWT_SECRET);
      req.ID_Rol = Decodificado.ID_Rol; // Suponiendo que el Nickname está en el token
      console.log(req.ID_Rol)
      req.ID_Usuario = Decodificado.ID_Usuario;
      console.log(req.ID_Usuario)
      req.Nickname = Decodificado.Nickname;
      console.log(req.Nickname)

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  





export const Metodos = {
    InicioSesion,
    redireccionInicio,
    ExtraerID,
    SoloModerador,
    SoloLoggeado,
    SoloAdmin,
}   