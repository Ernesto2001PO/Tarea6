const contactoRepository = require('../repositories/contactoRepository');

exports.getUserContacts = async (req, res) =>{
    const userId = req.params.usuarioId;
    
    try {
        const contacts = await contactoRepository.getContactsByUserId(userId);

        res.json(contacts);
    } catch (error) {
        
        console.error(error);
        res.sendStatus(500).send('Error al obtener los contactos');
    }
}

exports.getContactById = async (req, res) => {
    const contactId = req.params.contactoId;
    
    try {
        const contact = await contactoRepository.getContactById(contactId);

        res.json(contact);  
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Error al obtener el contacto');
    }
}

exports.createContact = async (req, res) => {
    const contacto = req.body;
    try {
        const contact = await contactoRepository.createContact(contacto);
        res.json(contact);  
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Error al crear el contacto');
    }
}
exports.deleteContact = async (req, res) => {
    const contactId = req.params.contactoId;

    try {
        await contactoRepository.deleteContact(contactId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Error al eliminar el contacto');
    }
}

exports.updateContact = async (req, res) => {
    const contacto = req.body;
    try {
        const contact = await contactoRepository.updateContact(contacto);

        res.json(contact);  
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Error al actualizar el contacto');
    }
}


exports.getAllContactos = async (req, res) => {
    try {
        const contactos = await contactoRepository.getAllContactos();

        res.json(contactos);
    } catch (error) {
        console.error(error);
        res.sendStatus(500).send('Error al obtener los contactos');
    }

}


