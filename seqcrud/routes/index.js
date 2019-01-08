const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/show', function(req, res, next) {
    models.post.findAll().then(result => {
        res.render('show', {
            posts:result
        });
    });
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
    })
    .catch(err=>{
        console.log('데이터 추가 실패');
        console.log(err);
    })
})

router.get('/edit/:id',function(req, res, next) {
    let postID = req.params.id;

    models.post.find({
        where: {id: postID}
    })
    .then(result => {
        res.render('edit', {
            post: result
        });
    })
    .catch(err => {
        console.log('데이터 조회 실패');
        console.log(err);
    })
})

router.post('/update/:id', function(req, res, next) {
    let postID = req.params.id;
    let body = req.body;

    models.post.update({
        title: body.editTitle,
        writer: body.editWriter
    },{
        where: {id: postID}
    })
    .then(result => {
        console.log('데이터 수정 완료');
        res.redirect('/show');
    })
    .catch(err => {
        console.log('데이터 수정 실패');
        console.log(err);
    })
})

module.exports = router;