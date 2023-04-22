// Requerimos la dependencia de mongoose para poder trabajar con MongoDB
const mongoose = require('mongoose');

//El esquema o tabla del modelo del user y especificamos sus propiedades(que si es un string o un booleano, etc)
const todoSchema = new mongoose.Schema({
    text: String, 
    checked: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

// Configuro la respuesta del usuario
todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id; //borrar el "_id" del string para que no salga "id._id"
        delete returnedObject.__v; //borrar el numero de la version
    }
});

//Le damos un nombre:
const Todo =  mongoose.model('Todo', todoSchema);

module.exports = Todo;

