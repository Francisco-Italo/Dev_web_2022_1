var express = require('express');
var router = express.Router();
var StudentService = require('../services/StudentServiceMongo');

router.get('/list', function(req, res, next) {
    StudentService.list(req, res);
});

router.post('/register', function(req, res, next) {
    StudentService.register(req, res);
});

router.put('/update/:id', function(req, res, next) {
    StudentService.update(req, res);
});

router.delete('/delete/:id', function(req, res, next) {
    StudentService.delete(req, res);
});

router.get('/retrieve/:id', function(req, res, next) {
    StudentService.retrieve(req, res);
});

router.get('/retrieve/login/:login', function(req, res, next) {
    StudentService.retrieveByLogin(req, res);
});

module.exports = router;