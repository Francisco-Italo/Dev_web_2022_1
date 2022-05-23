var mongoose = require('mongoose');

//criando o schema, o qual servirá para criar o modelo (collections)

var schema = mongoose.Schema(
{
    name:{type:String, required:true, max:200},
    univ:{type:String, required:true, max:150},
    degree:{type:String, required:true, max:20}
}
);

//criando o modelo a partir do schema acima, o qual servirá para incluir as instâncias
//(documentos)
var ProfessorModel = mongoose.model('professors', schema);

//retornando o modelo a ser usado pelo serviço (CRUD).
module.exports = ProfessorModel;