const StudentModel = require('../models/StudentModel');

class StudentServiceMongo{
    //retorna um objeto que representa um estudante
    static register(req,res){
        StudentModel.create(req.body).then(
        (student)=>{
            res.status(201).json(student);
        }
        );
    }

    //retorna um vetor de estudantes
    static list(req,res){
        StudentModel.find().then(
        (students)=>{
            res.status(200).json(students);
        }
        );
    }

    //retorna um estudante atualizado
    static update(req,res){
        StudentModel.findByIdAndUpdate(req.params.id, req.body, {'new':true}).then(
        (student)=>{
            res.status(200).json(student);
        }
        );
    }

    //retorna o estudante deletado
    static delete(req,res){
        StudentModel.findByIdAndRemove(req.params.id).then(
        (student)=>{
            res.status(200).json(student);
        }
        );
    }

    //retorna um estudante pelo seu id
    static retrieve(req,res){
        StudentModel.findById(req.params.id).then(
        (student)=>{
            res.status(200).json(student);
        }
        );
    }

    //retorna um vetor de estudantes
    static retrieveByLogin(req,res){
        StudentModel.find({'login':req.params.login}).then(
        (student)=>{
            res.status(200).json(student);
        }
        );
    }
}

module.exports = StudentServiceMongo;