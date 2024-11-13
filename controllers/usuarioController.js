const usuarioRepository = require('../repositories/usuarioRepository');

exports.login = async (req, res) => {

    const { username, password } = req.body;

    /*
        const username = req.body.username;
        const password = req.body.password;
    */
   console.log(req.body);

    try {
        const user = await usuarioRepository.getUsuarioByUsername(username);

        if (!user) {
            return res.status(401).json('Usuario o contraseña incorrectos');
        }
        if(user.password !== password){
            return res.status(401).json('Usuario o contraseña incorrectos');
        }
        delete user.password;

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json('Hubo un error al realizar el login');
    }
}


exports.createUser = async (req, res) => {
    const usuario = req.body; 
    try {
        const user = await usuarioRepository.createUsuario(usuario);

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error al crear el usuario');
    }
}


exports.getUsuariobyId = async (req, res) => {



    
};

