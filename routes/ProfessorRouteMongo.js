var express = require('express');
var router = express.Router();
var ProfessorService = require('../services/ProfessorServiceMongo');

router.get('/list', function(req, res, next) {
    ProfessorService.list(req, res);
});

router.post('/register', function(req, res, next) {
    ProfessorService.register(req, res);
});

router.put('/update/:id', function(req, res, next) {
    ProfessorService.update(req, res);
});

router.delete('/delete/:id', function(req, res, next) {
    ProfessorService.delete(req, res);
});

router.get('/retrieve/:id', function(req, res, next) {
    ProfessorService.retrieve(req, res);
});

router.get('/retrieve/login/:login', function(req, res, next) {
    ProfessorService.retrieveByLogin(req, res);
});

module.exports = router;