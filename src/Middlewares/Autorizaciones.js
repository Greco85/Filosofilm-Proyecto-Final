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


function SoloPublico(req, res, next){
     
}

export const ExtraerID = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
  
      if (!token) {
        throw new Error('Inicia Sesion para continuar');
      }
  
      const Decodificado = jwt.verify(token, process.env.JWT_SECRET);
      req.ID_Usuario = Decodificado.ID_Usuario; // Suponiendo que el Nickname está en el token
      console.log(req.ID_Usuario)

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }


export const Metodos = {
    SoloLoggeado,
    SoloPublico,
    redireccionInicio,
    ExtraerID,
}   