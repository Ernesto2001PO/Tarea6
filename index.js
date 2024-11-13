require('dotenv').config();
const dbConnection = require('./dbConnection/mysqlConnection');

const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));

const contactoRouter = require('./routes/contactoRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const imagenRouter = require('./routes/imagenRouter');


app.use('/api/contacto', contactoRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/image', imagenRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
