const dbConnection = require('../dbConnection/mysqlConnection');

let connection = null;
const getConnection = async () => {
    connection = connection || await dbConnection();
    return connection;
}

const getImagenById = async (id) => {

    const connection = await getConnection();

    const [rows] = await connection.query('SELECT * FROM imagen WHERE imagenId = ?', [id]);

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
}

const createImagen = async (imagen) => {

    const connection = await getConnection();

    const { fileName, path } = imagen;
    const temporal = 1;
    const fechaSubida = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const data = [fileName, path, temporal, fechaSubida];
    const sql = 'INSERT INTO imagen (fileName, path, temporal, fechaSubida) values (?,?,?,?)';

    const [result] = await connection.query(sql, data);
    const imagenId = result.insertId;

    return imagenId;
}

module.exports = {
    getImagenById,
    createImagen
};