const ProfessorModel = require('../models/ProfessorModel');

class ProfessorServiceMongo{
    //retorna um objeto que representa um professor
    static register(req,res){
        ProfessorModel.create(req.body).then(
        (professor)=>{
            res.status(201).json(professor);
        }
        );
    }

    //retorna um vetor de estudantes
    static list(req,res){
        ProfessorModel.find().then(
        (professors)=>{
            res.status(200).json(professors);
        }
        );
    }

    //retorna um estudante atualizado
    static update(req,res){
        ProfessorModel.findByIdAndUpdate(req.params.id, req.body, {'new':true}).then(
        (professor)=>{
            res.status(200).json(professor);
        }
        );
    }

    //retorna o estudante deletado
    static delete(req,res){
        ProfessorModel.findByIdAndRemove(req.params.id).then(
        (professor)=>{
            res.status(200).json(professor);
        }
        );
    }

    //retorna um estudante pelo seu id
    static retrieve(req,res){
        ProfessorModel.findById(req.params.id).then(
        (professor)=>{
            res.status(200).json(professor);
        }
        );
    }

    //retorna um vetor de estudantes
    static retrieveByLogin(req,res){
        ProfessorModel.find({'login':req.params.login}).then(
        (professor)=>{
            res.status(200).json(professor);
        }
        );
    }
}

module.exports = ProfessorServiceMongo;