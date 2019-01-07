const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/show', function(req, res, next) {
    res.render('show');
})

router.post('/create', function(req, res, next) {
    let body = req.body;

    models.post.create({
        title: body.inputTitle,
        writer: body.inputWriter
    })
    .then(result => {
        console.log('데이터 추가 완료');
        res.redirect('/show');
    }).catch(err=>{
        console.log('데이터 추가 실패');
        console.log(err);
    })
})

module.exports = router;
