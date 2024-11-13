const dbConnection = require("../dbConnection/mysqlConnection");

let connection = null;

const getConnection = async () => {
  if (connection === null) {
    connection = await dbConnection();
  }

  return connection;
};

exports.getUsuarioByUsername = async (username) => {
  const connection = await getConnection();

  const [rows] = await connection.query(
    "SELECT * FROM usuario WHERE userName = ?",
    [username]
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};

exports.createUsuario = async (usuario) => {
  const { userName, password, imagenId } = usuario;

  const connection = await getConnection();

  const existeImage = !isNaN(imagenId) && imagenId > 0;

  const data = [userName, password, existeImage ? imagenId : null];
  const sql =
    "INSERT INTO usuario (userName, password, imagenId) values (?,?,?)";

  const [result] = await connection.query(sql, data);

   if(existeImage){
        await connection.query('UPDATE imagen SET temporal = 0 WHERE imagenId = ?', [imagenId]);
    }

  return { ...usuario, id: result.insertId };
};



function uploadImage() {
  var input = document.querySelector("#imageUploader");

  var data = new FormData()
  data.append('file', input.files[0])

  fetch('api/image', {
      method: 'POST',
      body: data
  })
  .then(response => response.json())
  .then((imageId) => {
      document.getElementById("imageId").value = imageId;
      document.getElementById("miniatura").src = "api/image/" + imageId;
  });
}
