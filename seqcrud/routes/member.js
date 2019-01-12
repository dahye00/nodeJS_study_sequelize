const express = require('express');
const models = require('../models');
const crypto = require('crypto');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.send('환영합니다');
})

router.get('/sign_up', function(req, res, next) {
    res.render('member/signup');
});

router.post('/sign_up', function(req, res, next) {
    let body = req.body;

    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + '';
    let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

    models.member.create({
        name: body.memberName,
        email: body.memberEmail,
        password: hashPassword,
        salt: salt
    })
    .then(result => {
        res.redirect('/member/sign_up');
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/login', function(req, res, next) {
    let session = req.session ? req.session : false;

    res.render('member/login', {
        session : session
    });
})

router.post('/login', function(req, res, next) {
    let body = req.body;

    models.member.find({
        where: {email : body.memberEmail}
    })
    .then(result => {
        let dbPassword = result.dataValues.password;
        let inputPassword = body.password;
        let salt = result.dataValues.salt;
        let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

        if(dbPassword === hashPassword) {
            console.log('비밀번호 일치');
            //세션설정
            req.session.email = body.memberEmail;
            req.session.save(() => {
                res.redirect('/member/login');
            });
        } else {
            console.log('비밀번호 불일치');
            res.redirect('/member/login');
        }
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/logout', function(req, res, next) {
    delete req.session.email;
    req.session.save(() => {
        res.redirect('/member/login');
    });
})

module.exports = router;
