

async function login(req,res){

}

export const  RegistrarUsuario = async(req, res) => {
        try {
            const pool = await getConnection(); 
            const result = await  pool.request().query(queries.getAllActors)
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(error.message)
        }
    };


export const methods = {
    login,
    registrarse
}